import { Injectable } from '@angular/core';
import { SolidSession } from '../models/solid-session.model';
declare let solid: any;
declare let $rdf: any;
//import * as $rdf from 'rdflib'

// TODO: Remove any UI interaction from this service
import * as uuid from 'uuid';
import * as fileClient from 'solid-file-client';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../models/message.model';
import { Participant } from '../models/participant.model';
import { ChatChannel } from '../models/chat-channel.model';


const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const SH = $rdf.Namespace('http://www.w3.org/ns/shacl#');
const XSD = $rdf.Namespace('http://www.w3.org/2001/XMLSchema#');
const SCHEMA = $rdf.Namespace('http://schema.org/');
const DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/');
const TERMS = $rdf.Namespace('http://purl.org/dc/terms/');
const FLOW = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
const ICAL = $rdf.Namespace('http://www.w3.org/2002/12/cal/ical#');
const MEE = $rdf.Namespace('http://www.w3.org/ns/pim/meeting#');
const SIOC = $rdf.Namespace('http://rdfs.org/sioc/ns#');
const SOLIDRDF = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
const UI = $rdf.Namespace('http://www.w3.org/ns/ui#');
const RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");

// const JSONLD_CONTENT_TYPE = 'application/ld+json'
const JSONLD_CONTENT_TYPE = 'http://www.w3.org/ns/iana/media-types/application/ld+json#Resource'
const DEFAULT_ACCEPT = 'application/ld+json;q=0.9,text/turtle;q=0.8'
const INBOX_LINK_REL = 'http://www.w3.org/ns/ldp#inbox'

/**
 * A service layer for RDF data manipulation using rdflib.js
 * @see https://solid.inrupt.com/docs/manipulating-ld-with-rdflib
 */
@Injectable({
  providedIn: 'root',
})
export class RdfService {

  session: SolidSession;
  store = $rdf.graph();

  /**
   * A helper object that connects to the web, loads data, and saves it back. More powerful than using a simple
   * store object.
   * When you have a fetcher, then you also can ask the query engine to go fetch new linked data automatically
   * as your query makes its way across the web.
   * @see http://linkeddata.github.io/rdflib.js/doc/Fetcher.html
   */
  fetcher = $rdf.Fetcher;

  /**
   * The UpdateManager allows you to send small changes to the server to “patch” the data as your user changes data in
   * real time. It also allows you to subscribe to changes other people make to the same file, keeping track of
   * upstream and downstream changes, and signaling any conflict between them.
   * @see http://linkeddata.github.io/rdflib.js/doc/UpdateManager.html
   */
  updateManager = $rdf.UpdateManager;

  constructor (private toastr: ToastrService) {
    const fetcherOptions = {};
    this.fetcher = new $rdf.Fetcher(this.store, fetcherOptions);
    this.updateManager = new $rdf.UpdateManager(this.store);
    this.getSession();
  }

  /**
   * Fetches the session from Solid, and store results in localStorage
   */
  getSession = async() => {
    this.session = await solid.auth.currentSession(localStorage);
  }

  /**
   * Gets a node that matches the specified pattern using the VCARD onthology
   *
   * any() can take a subject and a predicate to find Any one person identified by the webId
   * that matches against the node/predicated
   *
   * @param {string} node VCARD predicate to apply to the $rdf.any()
   * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
   * @return {string} The value of the fetched node or an emtpty string
   * @see https://github.com/solid/solid-tutorial-rdflib.js
   */
  getValueFromVcard = (node: string, webId?: string): string | any => {
    return this.getValueFromNamespace(node, VCARD, webId);
  };

  /**
   * Gets a node that matches the specified pattern using the FOAF onthology
   * @param {string} node FOAF predicate to apply to the $rdf.any()
   * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
   * @return {string} The value of the fetched node or an emtpty string
   */
  getValueFromFoaf = (node: string, webId?: string) => {
    return this.getValueFromNamespace(node, FOAF, webId);
  };
 
  transformDataForm = (form: NgForm, me: any, doc: any) => {
    const insertions = [];
    const deletions = [];
    const fields = Object.keys(form.value);
    const oldProfileData = JSON.parse(localStorage.getItem('oldProfileData')) || {};

    // We need to split out into three code paths here:
    // 1. There is an old value and a new value. This is the update path
    // 2. There is no old value and a new value. This is the insert path
    // 3. There is an old value and no new value. Ths is the delete path
    // These are separate codepaths because the system needs to know what to do in each case
    fields.map(field => {

      let predicate = VCARD(this.getFieldName(field));
      let subject = this.getUriForField(field, me);
      let why = doc;

      let fieldValue = this.getFieldValue(form, field);
      let oldFieldValue = this.getOldFieldValue(field, oldProfileData);

      // if there's no existing home phone number or email address, we need to add one, then add the link for hasTelephone or hasEmail
      if(!oldFieldValue && fieldValue && (field === 'phone' || field==='email')) {
        this.addNewLinkedField(field, insertions, predicate, fieldValue, why, me);
      } else {

        //Add a value to be updated
        if (oldProfileData[field] && form.value[field] && !form.controls[field].pristine) {
          deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
          insertions.push($rdf.st(subject, predicate, fieldValue, why));
        }

        //Add a value to be deleted
        else if (oldProfileData[field] && !form.value[field] && !form.controls[field].pristine) {
          deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
        }

        //Add a value to be inserted
        else if (!oldProfileData[field] && form.value[field] && !form.controls[field].pristine) {
          insertions.push($rdf.st(subject, predicate, fieldValue, why));
        }
      }
    });

    return {
      insertions: insertions,
      deletions: deletions
    };
  };

  private addNewLinkedField(field, insertions, predicate, fieldValue, why, me: any) {
    //Generate a new ID. This id can be anything but needs to be unique.
    let newId = field + ':' + Date.now();

    //Get a new subject, using the new ID
    let newSubject = $rdf.sym(this.session.webId.split('#')[0] + '#' + newId);

    //Set new predicate, based on email or phone fields
    let newPredicate = field === 'phone' ? $rdf.sym(VCARD('hasTelephone')) : $rdf.sym(VCARD('hasEmail'));

    //Add new phone or email to the pod
    insertions.push($rdf.st(newSubject, predicate, fieldValue, why));

    //Set the type (defaults to Home/Personal for now) and insert it into the pod as well
    //Todo: Make this dynamic
    let type = field === 'phone' ? $rdf.literal('Home') : $rdf.literal('Personal');
    insertions.push($rdf.st(newSubject, VCARD('type'), type, why));

    //Add a link in #me to the email/phone number (by id)
    insertions.push($rdf.st(me, newPredicate, newSubject, why));
  }

  private getUriForField(field, me): string {
    let uriString: string;
    let uri: any;

    switch(field) {
      case 'phone':
        uriString = this.getValueFromVcard('hasTelephone');
        if(uriString) {
          uri = $rdf.sym(uriString);
        }
        break;
      case 'email':
        uriString = this.getValueFromVcard('hasEmail');
        if(uriString) {
          uri = $rdf.sym(uriString);
        }
        break;
      default:
        uri = me;
        break;
    }

    return uri;
  }

  /**
   * Extracts the value of a field of a NgForm and converts it to a $rdf.NamedNode
   * @param {NgForm} form
   * @param {string} field The name of the field that is going to be extracted from the form
   * @return {RdfNamedNode}
   */
  private getFieldValue(form: NgForm, field: string): any {
    let fieldValue: any;

    if(!form.value[field]) {
      return;
    }

    switch(field) {
      case 'phone':
        fieldValue = $rdf.sym('tel:+'+form.value[field]);
        break;
      case 'email':
        fieldValue = $rdf.sym('mailto:'+form.value[field]);
        break;
      default:
        fieldValue = form.value[field];
        break;
    }

    return fieldValue;
  }

  private getOldFieldValue(field, oldProfile): any {
    let oldValue: any;

    if(!oldProfile || !oldProfile[field]) {
      return;
    }

    switch(field) {
      case 'phone':
        oldValue = $rdf.sym('tel:+'+oldProfile[field]);
        break;
      case 'email':
        oldValue = $rdf.sym('mailto:'+oldProfile[field]);
        break;
      default:
        oldValue = oldProfile[field];
        break;
    }

    return oldValue;
  }

  private getFieldName(field): string {
    switch (field) {
      case 'company':
        return 'organization-name';
      case 'phone':
      case 'email':
        return 'value';
      default:
        return field;
    }
  }

  updateProfile = async (form: NgForm) => {
    const me = $rdf.sym(this.session.webId);
    const doc = $rdf.NamedNode.fromValue(this.session.webId.split('#')[0]);
    const data = this.transformDataForm(form, me, doc);

    //Update existing values
    if(data.insertions.length > 0 || data.deletions.length > 0) {
      this.updateManager.update(data.deletions, data.insertions, (response, success, message) => {
        if(success) {
          this.toastr.success('Your Solid profile has been successfully updated', 'Success!');
          form.form.markAsPristine();
          form.form.markAsTouched();
        } else {
          this.toastr.error('Message: '+ message, 'An error has occurred');
        }
      });
    }
  };

  getAddress = () => {
    const linkedUri = this.getValueFromVcard('hasAddress');

    if (linkedUri) {
      return {
        locality: this.getValueFromVcard('locality', linkedUri),
        country_name: this.getValueFromVcard('country-name', linkedUri),
        region: this.getValueFromVcard('region', linkedUri),
        street: this.getValueFromVcard('street-address', linkedUri),
      };
    }

    return {};
  };

  //Function to get email. This returns only the first email, which is temporary
  getEmail = () => {
    const linkedUri = this.getValueFromVcard('hasEmail');

    if (linkedUri) {
      return this.getValueFromVcard('value', linkedUri).split('mailto:')[1];
    }

    return '';
  }

  //Function to get phone number. This returns only the first phone number, which is temporary. It also ignores the type.
  getPhone = () => {
    const linkedUri = this.getValueFromVcard('hasTelephone');

    if(linkedUri) {
      return this.getValueFromVcard('value', linkedUri).split('tel:+')[1];
    }
  };

  getProfile = async () => {

    if (!this.session) {
      await this.getSession();
    }

    try {
      await this.fetcher.load(this.session.webId);

      return {
        fn : this.getValueFromVcard('fn'),
        company : this.getValueFromVcard('organization-name'),
        phone: this.getPhone(),
        role: this.getValueFromVcard('role'),
        image: this.getValueFromVcard('hasPhoto'),
        address: this.getAddress(),
        email: this.getEmail(),
      };
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  };

  /**
   * Gets any resource that matches the node, using the provided Namespace
   * @param {string} node The name of the predicate to be applied using the provided Namespace 
   * @param {$rdf.namespace} namespace The RDF Namespace
   * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me) 
   */
  private getValueFromNamespace(node: string, namespace: any, webId?: string): string | any {
    const store = this.store.any($rdf.sym(webId || this.session.webId), namespace(node));
    if (store) {
      return store.value;
    }
    return '';
  }

  getFriends = () =>
  {
    const user = this.session.webId;
    const amigos = this.store.each($rdf.sym(user), FOAF('knows'));
    const lista_amigos = [];
    try {
      let i=0;
      for (i=0; i<amigos.length; i++)
      {
        lista_amigos.push(amigos[i].value);
      }
      return lista_amigos;
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }


  /*********************************/
  /* CÓDIGO NUEVO A PARTIR DE AQUÍ */
  /*********************************/

  /**
   * @param folderUri Example: https://yourpod.solid.community/private/
   * @param newChatChannel Chat a guardar en el POD (se usará el id del chat para la URL, por tanto, debe ser único)
   */
  async saveNewChatChannel(folderUri: String, newChatChannel: ChatChannel) {
    let chatUri = folderUri + newChatChannel.id;
    let channel = this.store.sym(chatUri);

    this.store.add(channel, DC("title"), newChatChannel.title, channel.doc());
    this.store.add(channel, DC("created"), newChatChannel.created, channel.doc());
    newChatChannel.participants.forEach(element => {
      this.store.add(channel, FLOW("participation"), element.webId, channel.doc());
    });

    this.fetcher.putBack(channel);
  }

  /**
   * @param chatUri Example: https://yourpod.solid.community/private/aaaaa-bbbbb-ccccc
   * @param msg Mensaje a guardar en el POD
   */
  async saveMessage(chatUri: String, message: Message) {
    let msgUri = await this.generateUniqueUrlForResource(chatUri);
    try {
      let msg = this.store.sym(msgUri);

      this.store.add(msg, TERMS("created"), message.sendTime, msg.doc());
      this.store.add(msg, FOAF("maker"), message.makerWebId, msg.doc());
      this.store.add(msg, SIOC("content"), message.message, msg.doc());

      this.fetcher.putBack(msg);
      console.log("Message saved! (" + msgUri + ")");
    } catch (err) {
      console.log("An error occurred while saving the message (" + msgUri + ")");
    }
  }

  /**
   * Método que obtiene los mensajes en jsonld recibidos en el inbox especificado,
   * una vez obtenidos los elimina del inbox.
   * 
   * Devuelve un array con dichos mensajes.
   * 
   * @param inboxUri 
   */
  public getInboxMessages(inboxUri: string): Promise<Message> {
    let fileUri = this.store.sym(inboxUri);    

    return new Promise((resolve, reject) => {
      this.fetcher.load(fileUri.doc()).then(response => {
        this.store.match(null, RDF('type'), null, fileUri.doc()).map(async st => {
          // Verificamos que sea JSONLD
          if (st.object.value == JSONLD_CONTENT_TYPE) {
            let jsonld = await this.readFile(st.subject.value); // st.subject.value -> URL del jsonld
            try {
              let jsonMessage: Message = JSON.parse(jsonld);
              // Verificamos que sea un mensaje válido
              if (jsonMessage.makerWebId && jsonMessage.message && jsonMessage.sendTime) {
                this.deleteFile(st.subject.value);
                resolve(jsonMessage);
              }
            } catch (err) {
              console.log("The message does not have the correct structure. (" + st.subject.value + ")");
            }
          }
        });
      });
    });
  }

  /**
   * Método para recuperar los canales de chat almacenados en el POD.
   * (El método ordenará los mensajes de cada canal de chat en función de la fecha de envío)
   * 
   * @param chatChannelsFolderUri Example: https://yourpod.solid.community/private/dechat_es6b/
   */
  public loadChatChannels(chatChannelsFolderUri: string): ChatChannel[] {
    let folderUri = this.store.sym(chatChannelsFolderUri);
    let chatChannels: ChatChannel[] = new Array();

    Promise.all(this.fetcher.load(folderUri.doc()).then(response => {
      // Obtenemos los canales de chat
      this.store.match(folderUri, LDP('contains'), null, folderUri.doc()).map(async st => {
        let fileUri = this.store.sym(st.object.value); // fileUri -> URI del canal
        
        // Obtenemos los datos del canal de chat
        this.fetcher.load(fileUri.doc()).then(async response => {
          var d = await this.store.each(null, FLOW("participation"), null, fileUri.doc()); 
          // Si contiene "participation" suponemos que es un canal de chat válido
          // Comprobamos que sea un canal de chat válido
          if (d.length != 0) {
            let messages: Message[] = new Array();

            let id = st.object.value.split('/').pop();
            let title = this.store.match(fileUri, DC("title"), null, fileUri.doc()).map(st => { return (st.object.value) });
            let created = this.store.match(fileUri, DC("created"), null, fileUri.doc()).map(st => { return (st.object.value) });
            
            // Obtenemos los datos de cada participante del canal de chat
            this.store.match(fileUri, FLOW("participation"), null, fileUri.doc()).map(async st => {
              let me = this.store.sym(st.object.value.toString());
              this.fetcher.load(me.doc()).then(response => {
                let participant: Participant = new Participant(st.object.value.toString(),"","");
                this.store.match(me, VCARD("fn"), null, me.doc()).map(st => { participant.name = st.object.value });
                this.store.match(me, VCARD("hasPhoto"), null, me.doc()).map(st => { participant.imageURL = st.object.value });
                chatChannel.participants.push(participant);
              });
            });

            // Obtenemos los datos de los mensajes del chat
            this.store.match(null, SIOC("content"), null, fileUri.doc()).map(async st => {
              let messageUri = this.store.sym(st.subject.value);
              await this.fetcher.load(messageUri.doc()).then(response => {
                let msgCreated = this.store.match(messageUri, TERMS("created"), null, messageUri.doc()).map(st => { return (st.object.value) });
                let msgContent = this.store.match(messageUri, SIOC("content"), null, messageUri.doc()).map(st => { return (st.object.value) });
                let msgMaker = this.store.match(messageUri, FOAF("maker"), null, messageUri.doc()).map(st => { return (st.object.value) });
                messages.push(new Message(msgMaker, msgContent, new Date(msgCreated)));
              });
              // Ordenamos los mensajes del canal de chat (llegan desordenados)
              messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });
            });

            // Creamos el canal de chat con los datos obtenidos y lo añadimos al array
            let chatChannel: ChatChannel = new ChatChannel(id, title, new Date(created), messages);
            chatChannels.push(chatChannel);
          } else {
            console.log(st.object.value + " is not a valid chat channel");
          }

        });
      });
    }));

    return chatChannels;
  }

  async getVCardName(webid: string): Promise<string> {
    let me = this.store.sym(webid);
    let name = "";
    
    await this.fetcher.load(me.doc()).then(response => {
      this.store.match(me, VCARD("fn"), null, me.doc()).map(st => { name = st.object.value });
    });

    return name;
  }

  async getVCardImage(webid: string): Promise<string> {
    let me = this.store.sym(webid);
    let image = "";
    
    await this.fetcher.load(me.doc()).then(response => {
      this.store.match(me, VCARD("hasPhoto"), null, me.doc()).map(st => { image = st.object.value });
    });

    return image;
  }

  async loadParticipantData(webid: string): Promise<Participant> {
    try {
      let imageURL = await this.getVCardImage(webid);
      let name = await this.getVCardName(webid);
      return new Participant(webid, imageURL, name);
    } catch (err) { console.log("An error occurred when loading the participant: " + err); }
  }

  /**
   * Example result: https://yourpod.solid.community
   */
  async getWebId(): Promise<string> {
    var sess = await solid.auth.currentSession();
    if (sess) return sess.webId;
    else throw new Error("No current session!");
  }



   /***************************************************************/

  /**
   * Crea un fichero vacío
   *
   * @param newFile
   */
  async createFile(newFile, content?, contentType?) {
    fileClient.createFile(newFile, content, contentType)
        .then( fileCreated => { console.log(`Created file ${fileCreated}.`); }, err => console.log(err) );
  }

  /**
   *
   * @param file
   */
  async readFile(file) {
    return fileClient.readFile(file).then(body => { return(body) }, err => console.log(err) );
  }

  /**
   *
   * @param url
   * @param newContent
   * @param contentType
   */
  async updateFile(url, newContent, contentType?: string) {
    await fileClient.updateFile( url, newContent, contentType )
        .then( success => { console.log( `Updated ${url}.`) }, err => console.log(err) );
  }

  /**
   *
   * @param url
   */
  async deleteFile(url) {
    await fileClient.deleteFile(url)
        .then(success => { console.log(`Deleted ${url}.`); }, err => console.log(err) );
  }

  /**
   * URL FICHERO ORIGEN ---> URL FICHERO DESTINO
   *
   * @param oldFile
   * @param newFile
   */
  async copyFile(oldFile,newFile) {
    fileClient.readFile(oldFile).then( content => {
      fileClient.createFile(newFile,content).then( res => {
        return(res);
      }, err => {throw new Error("copy upload error  "+err)});
    }, err => {throw new Error("copy download error  "+err)});
  }

  /**
   *
   * @param url
   */
  async createFolder(url: string) {
    await fileClient.createFolder(url)
        .then(success => { console.log(`Created folder ${url}.`); }, err => console.log(err) );
  }

  /**
   * {
          type : "folder",
          name : // folder name (without path),
           url : // full URL of the resource,
      modified : // dcterms:modified date
         mtime : // stat:mtime
          size : // stat:size
        parent : // parentFolder or undef if none,
       content : // raw content of the folder's turtle representation,
         files : // an array of files in the folder
       folders : // an array of sub-folders in the folder,
      }
   *
   * @param url
   */
  async readFolder(url) {
    return fileClient.readFolder(url).then(folder => { return(folder) }, err => console.log(err) );
  }


  














  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

 
  // Actualizar
  public async updateTest() {

    const me = this.store.sym('https://dcarballob01.solid.community/public/chat_' + new Date().getTime() + '.ttl');
    const doc = me.doc();

    var ins = $rdf.st("PERSONA", FLOW("message"), "Mensaje_Nuevo", doc)
    var del = []
    
    this.updateManager.update(del, ins, (uri, ok, message) => {
      if (ok) console.log('Name changed to '+ "DAVID")
      else alert(message)
    })
  }

  // ----------------------------------------------------------------

  
  public test() {
    //solid.auth.fetch("https://dcarballob01.solid.community/public/",{headers: {accept: "image/*;q=0.9, */*;q=0.1, application/rdf+xml;q=0.9, application/xhtml+xml, text/xml;q=0.5, application/xml;q=0.5, text/html;q=0.9, text/plain;q=0.5, text/n3;q=1.0, text/turtle;q=1"}}).

    solid.auth.fetch("https://dcarballob01.solid.community/inbox/",{headers: {accept: DEFAULT_ACCEPT}}).
    then(function(response){return response.text();}).
    then(function(data){ console.log(data);})
  }



  // ------------ FUNCIONES VÁLIDAS ------------------

  public uniqid(): string {
    return '#' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * This method creates an empty file for the given url. It overwrites existing files.
   * @param url: the url of the empty file
   * @returns {Promise}: the promise from auth.fetch().
   */
  createEmptyFileForUser(url) {
    var request = {
      method: 'PUT',
      body: ''
    };
    return solid.auth.fetch( url, request );
  }

  /**
   * This method sends a notification to an inbox.
   * @param url: the url of the inbox.
   * @param data: the RDF data representing the notification.
   * @returns {Promise}: the promise from auth.fetch().
   */
  sendToUserInbox(urlInbox, data) {
    var request = {
      method: 'POST',
      body: data
    }
    return solid.auth.fetch( urlInbox, request );
  }

  /**
   * This method deletes a file.
   * @param url: the url of the file that needs to be deleted.
   * @returns {Promise}: the promise from auth.fetch().
   */
  deleteFileForUser(urlFile) {
    var request = {
      method: 'DELETE'
    }
    return solid.auth.fetch( urlFile, request );
  }

  /**
   * This method executes an SPARQL update on a file.
   * @param url: the url of the file that needs to be updated.
   * @param query: the SPARQL update query that needs to be executed.
   * @returns {Promise}: the promise from auth.fetch().
   */
  executeSPARQLUpdateForUser(url, query) {
    var request = {
      method: 'PATCH',
      body: query,
      headers: {
        'Content-Type': 'application/sparql-update'
      }
    };
    return solid.auth.fetch( url, request );
  }

  /**
   * This method checks if the current user has write access to a file.
   * @param url: the url of the file to check.
   * @returns {Promise<boolean>}: a promise that resolves with true if the user has write access, else false.
   */
  async writePermission(url) {
    // TODO We should probably check the ACL of the parent folder to see if we can write if the file doesn't exist and
    // if the file exists, we check the ACL of the file.
    const response = await this.executeSPARQLUpdateForUser(url, 'INSERT DATA {}');
    return response.status === 200;
  }

  // Genera una URL única para un recurso (POSIBLEMENTE NECESARIO CAMBIAR EL NAMESPACE)
  async generateUniqueUrlForResource(baseurl) {
    let url = this.store.sym(baseurl + '#' + uuid.v4());

    try {
      await this.fetcher.load(url.doc()).then(async response => {
        //var d = this.store.each(url, RDF('type'));
        var d = this.store.each(url);

        // We assume that if this url doesn't have a type, the url is unused.
        // Ok, this is not the most fail-safe thing.
        // TODO: check if there are any triples at all.
        while (d.length != 0) {
          url = baseurl + '#' + uuid.v4();
          //d = this.store.each(url, RDF('type'));
          d = await this.store.each(url);
        }
      }, err => {
        console.log("Load failed " +  err);
      });
    } catch (e) {
      // this means that response of data[url] returns a 404
      // TODO might be called when you have no access, should check
    } finally {
      return url;
    }
  }

}
