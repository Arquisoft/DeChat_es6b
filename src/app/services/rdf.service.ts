import { Injectable } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { SolidSession } from '../models/solid-session.model';
declare let solid: any;
declare let $rdf: any;
//import * as $rdf from 'rdflib'

import * as uuid from 'uuid';
import * as fileClient from 'solid-file-client';

// TODO: Remove any UI interaction from this service
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
const ACL = $rdf.Namespace("http://www.w3.org/ns/auth/acl#");
const TYPE = $rdf.Namespace("https://www.w3.org/1999/02/22-rdf-syntax-ns#type");

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

  constructor (private toastr: ToastrService, private chatUtils: UtilsService) {
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
   * @param folderUri Example: https://yourpod.solid.community/private/
   * @param newChatChannel Chat a guardar en el POD (se usará el id del chat para la URL, por tanto, debe ser único)
   */
  async saveNewChatChannel(folderUri: String, newChatChannel: ChatChannel) {
    let chatUri = folderUri + newChatChannel.id;
    let channel = this.store.sym(chatUri);

    this.store.add(channel, TYPE(), MEE("LongChat"), channel.doc());
    this.store.add(channel, DC("title"), newChatChannel.title, channel.doc());
    this.store.add(channel, DC("created"), newChatChannel.created, channel.doc());
    newChatChannel.participants.forEach(element => {
      let part = this.store.sym(element.webId);
      this.store.add(channel, FLOW("participation"), part, channel.doc());
    });
    this.store.add(channel, DC("group"), (newChatChannel.group)? this.store.sym(newChatChannel.group) : "", channel.doc());

    await this.fetcher.putBack(channel);
  }

  /**
   * Guarda un mensaje en el POD, devuelve la URI asignada al mensaje.
   * 
   * @param chatUri Example: https://yourpod.solid.community/private/aaaaa-bbbbb-ccccc
   * @param msg Mensaje a guardar en el POD
   */
  async saveMessage(chatUri: String, message: Message): Promise<string> {
    let msgUri = await this.generateUniqueUrlForResource(chatUri + "#");
    try {
      let msg = this.store.sym(msgUri);

      this.store.add(msg, TERMS("created"), message.sendTime, msg.doc());
      this.store.add(msg, FOAF("maker"), message.makerWebId, msg.doc());
      this.store.add(msg, SIOC("content"), message.message, msg.doc());
      this.store.add(msg, DC("status"), message.status, msg.doc());

      await this.fetcher.putBack(msg);
      console.log("Message saved! (" + msgUri + ")");
      return msgUri;
    } catch (err) {
      console.error("An error occurred while saving the message (" + msgUri + ")");
    }
  }

  /**
   * Actualiza el estado de un mensaje en el POD a READ.
   * 
   * @param msgsUris Example: https://yourpod.solid.community/private/aaaaa-bbbbb-ccccc#aaaaa-bbbbb-ccccc
   */
  async updateMessageToRead(msgsUris: string[]) {
    let ins = [];
    let del = [];

    msgsUris.forEach(msgUri => { 
      let msg = this.store.sym(msgUri);
      ins.push($rdf.st(msg, DC("status"), Message.Status.READ, msg.doc()))
      del.push($rdf.st(msg, DC("status"), Message.Status.PENDING, msg.doc()));
    });
      
    this.updateManager.update(del, ins, (uri, ok, message) => {
      if (ok) console.log('Messages marked as read successfully!');
      else console.error("An error occurred when marking the messages as read.")
    });
  }
  
  /**
   * Crea un nuevo grupo de chat, devuelve su URI si se creo correctamente, 
   * null en caso contrario.
   * 
   * @param folderGroupUri Example: /private/dechat_groups
   * @param makerWebId 
   */
  public async addNewChatGroupToFile(folderGroupUri: string, makerWebId: string, title: string): Promise<string> {
    console.log("Creating a group...");
    
    let participant = this.store.sym(makerWebId);
    let fileGroup = await this.generateUniqueUrlForResource(folderGroupUri + "/");

    let group = this.store.sym(fileGroup);
    this.store.add(group, TYPE(), MEE("ChatGroup"), group.doc());
    this.store.add(group, DC("title"), title, group.doc());
    this.store.add(group, FLOW("participation"), participant, group.doc());
    await this.fetcher.putBack(group);

    // Creamos el fichero .acl (permisos) y le asignamos el Owner (makerWebId)
    await this.updateFile(fileGroup + ".acl", "");
    await this.addOwnerToACL(fileGroup, participant);

    return fileGroup;
  }

  /**
   * Añade un nuevo participante al grupo de chat especificado por parámetro, si el
   * grupo no existe o el participante ya pertenece al grupo no se hace nada.
   * 
   * @param groupFileUri 
   * @param newParticipant 
   */
  public async addParticipantToGroup(groupFileUri: string, newParticipant: string) {
    console.log("Adding a participant to the group...");

    let participant = this.store.sym(newParticipant);
    let group = this.store.sym(groupFileUri.toString());
    
    await this.fetcher.load(group.doc()).then(async res => {
      let d = await this.store.each(null, FLOW("participation"), null, group.doc());
      let w = await this.store.each(null, FLOW("participation"), participant, group.doc());

      // Si contiene "participation" suponemos que es un grupo de chat válido
      // Si no contiene ya al participante lo añadimos
      if (d.length != 0 && w.length == 0) {
        let ins = $rdf.st(group, FLOW("participation"), participant, group.doc());
        let del = [];
        
        this.updateManager.update(del, ins, (uri, ok, message) => {
          if (ok) console.log('Participant added to the group successfully!');
          else console.error("An error occurred when trying to add the participant to the group.")
        });

        // // Asignamos permisos al nuevo participante
        this.addOwnerToACL(groupFileUri.toString(), participant);
      } else {
        console.error("Invalid group or participant already exists")
      }
    });
  }

  /**
   * Elimina un participante del grupo de chat especificado por parámetro y sus permisos
   * sobre el grupo de chat.
   * 
   * @param groupFileUri 
   * @param oldParticipant 
   */
  public async removeParticipantFromGroup(groupFileUri: string, oldParticipant: string) {
    console.log("Removing participant from the group...");
    
    let participant = this.store.sym(oldParticipant);
    // Eliminar participante del grupo
    let group = this.store.sym(groupFileUri.toString());
    await this.fetcher.load(group.doc()).then(res => {
      let ins = [];
      let del = $rdf.st(group, FLOW("participation"), participant, group.doc());
      
      this.updateManager.update(del, ins, (uri, ok, message) => {
        if (ok) console.log('Participant successfully deleted!');
        else console.error("An error occurred when deleting the participant from the group.")
      });
    });

    // Eliminar permisos del participante sobre el grupo
    let groupPermissions = this.store.sym(groupFileUri.toString() + ".acl");
    
    await this.fetcher.load(groupPermissions.doc()).then(async res => {
      let uri = await this.store.match(null, ACL("agent"), participant, groupPermissions.doc()).map(st => { return (st.subject.value); });
      uri = this.store.sym(uri[0]);

      let ins = [];
      let del = this.store.statementsMatching(uri, null, null, groupPermissions.doc());

      this.updateManager.update(del, ins, (uri, ok, message) => {
        if (ok) console.log('Participant permissions successfully removed!');
        else console.error("An error occurred when deleting group participant permissions.")
      });
    });
  }

  /**
   * Devuelve todos los participantes de un grupo de chat.
   * 
   * @param groupFileUri 
   */
  public async getGroupChatParticipants(groupFileUri: string): Promise<Participant[]> {
    let participants: Participant[] = new Array();
    let group = this.store.sym(groupFileUri.toString());

    let promises = this.fetcher.load(group.doc()).then(res => {
      return Promise.all(this.store.match(group, FLOW("participation"), null, group.doc()).map(async st => {
        return this.loadParticipantData(st.object.value.toString());
      }));
    });

    // Guardamos los participantes en un array
    await promises.then(parts => { parts.forEach(part => { participants.push(part); })});

    // Devolvemos el array de participantes (son promesas)
    return participants;
  }

  /**
   * Devuelve el título de un grupo de chat
   * 
   * @param groupFileUri 
   */
  public async getChatGroupTitle(groupFileUri: string): Promise<string> {
    let group = this.store.sym(groupFileUri.toString());

    let promise = this.fetcher.load(group.doc()).then(res => {
      return Promise.all(this.store.match(group, DC("title"), null, group.doc()).map(async st => {
        return st.object.value.toString();
      }));
    });

    return (await promise.then(title => { return title })).toString();
  }

  /**
   * Método que obtiene los mensajes en jsonld recibidos en el inbox especificado,
   * una vez obtenidos los elimina del inbox.
   * 
   * Devuelve un array con dichos mensajes.
   * (Puede devolver objetos "undefined" en dicho array, intentar arreglar)
   * 
   * @param inboxUri 
   */
  public async getInboxMessages(inboxUri: string): Promise<any[]> {
    let messages: Message[] = new Array();
    let fileUri = this.store.sym(inboxUri);
        
    let promises = this.fetcher.load(fileUri.doc()).then(async response => {
      return Promise.all(this.store.match(null, RDF('type'), null, fileUri.doc()).map(async st => {
        // Verificamos que sea JSONLD
        if (st.object.value == JSONLD_CONTENT_TYPE) {
          let jsonld = await this.readFile(st.subject.value); // st.subject.value -> URL del jsonld
          try {
            let jsonMessage: any = JSON.parse(jsonld);
            // Verificamos que sea un mensaje válido
            if (jsonMessage.makerWebId && jsonMessage.message && jsonMessage.sendTime) {
              this.deleteFile(st.subject.value);
              return jsonMessage;
            }
          } catch (err) {
            console.error("The message does not have the correct structure. (" + st.subject.value + ")");
          }
        }
      }));
    });

    // Guardamos los mensajes en un array
    await promises.then(msgs => { msgs.forEach(msg => { messages.push(msg); })});

    // Devolvemos el array de mensajes (son promesas)
    return messages.filter(msg => { return msg != undefined });
  }

  /**
   * Método para recuperar los canales de chat almacenados en el POD.
   * (El método ordenará los mensajes de cada canal de chat en función de la fecha de envío)
   * 
   * @param chatChannelsFolderUri Example: https://yourpod.solid.community/private/dechat_es6b/
   */
  public async loadChatChannels(chatChannelsFolderUri: string): Promise<ChatChannel[]> {
    let chatChannels: ChatChannel[] = new Array();
    let chatFolder = this.store.sym(chatChannelsFolderUri);

    let promises = this.fetcher.load(chatFolder.doc()).then(response => {
      // Obtenemos los canales de chat
      return Promise.all(this.store.match(chatFolder, LDP('contains'), null, chatFolder.doc()).map(async st => {
        let fileUri = this.store.sym(st.object.value); // st.object.value -> URI del canal
        
        // Obtenemos los datos del canal de chat
        return this.fetcher.load(fileUri.doc()).then(async response => {
          var d = await this.store.each(null, TYPE(), MEE("LongChat"), fileUri.doc()); 
          // Comprobamos que sea un canal de chat válido
          if (d.length != 0) {
            let id = st.object.value.split('/').pop();
            let title = this.store.match(fileUri, DC("title"), null, fileUri.doc()).map(st => { return (st.object.value) });
            let created = this.store.match(fileUri, DC("created"), null, fileUri.doc()).map(st => { return (st.object.value) });
            let group = await this.store.match(fileUri, DC("group"), null, fileUri.doc()).map(st => { return (st.object.value) });

            // FETCHEAMOS todos los participantes del chat grupal
            if (group && group.toString().trim().length > 0) {
              let participants = await this.getGroupChatParticipants(group.toString());
              participants.forEach(async p => { await this.fetchNewParticipant(p.webId.toString()) });
            }
            
            // Obtenemos participantes y mensajes del canal de chat
            let messages = await this.getMessagesChatChannel(st.object.value);
            let participants = await this.getParticipantsChatChannel(st.object.value);

            // Retornamos el canal de chat con los datos obtenidos
            return new ChatChannel(id, title, group.toString(), new Date(created), messages, participants);
          } else {
            console.error(st.object.value + " is not a valid chat channel");
          }
        });
      }));
    });

    // Guardamos los canales de chat en un array
    await promises.then(channels => { channels.forEach(channel => { chatChannels.push(channel) })});

    // Devolvemos el array de canales de chat (son promesas)
    return chatChannels.filter(channel => { return channel != undefined });
  }

  /**
   * Método para obtener los datos de todos los participantes del canal de chat
   * 
   * @param chatChannelUri 
   */
  public async getParticipantsChatChannel(chatChannelUri: string): Promise<Participant[]> {
    let participants: Participant[] = new Array();
    let fileUri = this.store.sym(chatChannelUri);

    let promises = this.fetcher.load(fileUri.doc()).then(res => {
      return Promise.all(this.store.match(fileUri, FLOW("participation"), null, fileUri.doc()).map(async st => {
        let me = this.store.sym(st.object.value.toString());

        await this.fetchNewParticipant(st.object.value.toString());

        return this.fetcher.load(me.doc()).then(res => {
          let nameFN = this.store.match(me, VCARD("fn"), null, me.doc()).map(st => { return (st.object.value) });
          let nameNAME = this.store.match(me, FOAF("name"), null, me.doc()).map(st => { return (st.object.value) });
          let imageURL = this.store.match(me, VCARD("hasPhoto"), null, me.doc()).map(st => { return (st.object.value) });
          let selectedName = (nameFN != undefined && nameFN.length != 0)? nameFN.toString() : nameNAME.toString();
          let selectedImageURL = (imageURL.length > 0)? imageURL[0].toString() : ""; // Seleccionamos la primera imagen (si la hay)
          return new Participant(st.object.value.toString(), selectedImageURL.toString(), selectedName.toString());
        });
      }));
    });

    // Guardamos los participantes en un array
    await promises.then(parts => { parts.forEach(part => { participants.push(part) })});

    // Devolvemos el array de participantes (son promesas)
    return participants;
  }

  /**
   * Método para obtener los datos de todos los mensajes de un canal de chat
   * 
   * @param chatChannelUri 
   */
  public async getMessagesChatChannel(chatChannelUri: string): Promise<Message[]> {
    let messages: Message[] = new Array();
    let fileUri = this.store.sym(chatChannelUri);

    let promises = this.fetcher.load(fileUri.doc()).then(res => {
       return Promise.all(this.store.match(null, SIOC("content"), null, fileUri.doc()).map(async st => {
        let messageUri = this.store.sym(st.subject.value);
        let messageId = st.subject.value.split('#').pop();

        return this.fetcher.load(messageUri.doc()).then(res => {
          let msgCreated = this.store.match(messageUri, TERMS("created"), null, messageUri.doc()).map(st => { return (st.object.value) });
          let msgContent = this.store.match(messageUri, SIOC("content"), null, messageUri.doc()).map(st => { return (st.object.value) });
          let msgMaker = this.store.match(messageUri, FOAF("maker"), null, messageUri.doc()).map(st => { return (st.object.value) });
          let msgStatus = this.store.match(messageUri, DC("status"), null, messageUri.doc()).map(st => { return (st.object.value) });
          return new Message(msgMaker.toString(), msgContent.toString(), new Date(msgCreated), messageId, msgStatus.toString());
        });
      }));
    });

    // Guardamos los mensajes en un array
    await promises.then(msgs => { msgs.forEach(msg => { messages.push(msg); })});

    // Ordenamos los mensajes del canal de chat (llegan desordenados)
    messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });

    // Devolvemos el array de mensajes (son promesas)
    return messages;
  }

  /**
   * Métodos para asignar un propietario a un fichero
   * 
   * '@prefix  acl:     <http://www.w3.org/ns/auth/acl#>.\n'+
   *     
   *     '<#owner>\n'+
   *     'a                  acl:Authorization;\n'+
   *     'acl:agent          <'+ownerWebId+'>;\n'+
   *     'acl:accessTo       <'+fileURI+'>;\n'+
   *     'acl:defaultForNew  <'+fileURI+'>;\n'+
   *     'acl:mode           acl:Read, acl:Write, acl:Control.\n'+
   * 
   * @param fileURI 
   * @param ownerWebId 
   * @param otherWebId 
   */
  public async addOwnerToACL(fileURI: string, ownerWebId: string) {
    let file = this.store.sym(fileURI);
    let owner = this.store.sym(ownerWebId);

    let uniqueUri = await this.generateUniqueUrlForResource(fileURI + ".acl#owner");
    let aclFile = this.store.sym(uniqueUri);

    await this.fetcher.load(aclFile.doc()).then(response => {
      let ins = [];
      ins.push($rdf.st(aclFile, TYPE(), ACL("Authorization"), aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("agent"), owner, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("accessTo"), file, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("defaultForNew"), file, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("mode"), ACL("Read"), aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("mode"), ACL("Write"), aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("mode"), ACL("Control"), aclFile.doc()));

      let del = [];
      
      this.updateManager.update(del, ins, (uri, ok, message) => {
        if (ok) console.log('Read-Write-Control permissions successfully added!');
        else console.error("An error occurred when adding Read-Write-Control permissions.")
      });
    });
  }

  /**
   * Métodos para añadir un lector a un fichero.
   * (permisos de lectura)
   * 
   * '<#reader>\n'+
   *     'a                  acl:Authorization;\n'+
   *     'acl:agent          <'+otherWebId+'>;\n'+
   *     'acl:accessTo       <'+fileURI+'>;\n'+
   *     'acl:defaultForNew  <'+fileURI+'>;\n'+
   *     'acl:mode           acl:Read.'
   * 
   * @param fileURI 
   * @param string 
   * @param otherWebId 
   */
  public async addReaderToACL(fileURI: string, otherWebId: string) {
    let file = this.store.sym(fileURI);
    let other = this.store.sym(otherWebId);

    let uniqueUri = await this.generateUniqueUrlForResource(fileURI + ".acl#reader");
    let aclFile = this.store.sym(uniqueUri);

    await this.fetcher.load(aclFile.doc()).then(response => {
      let ins = [];
      ins.push($rdf.st(aclFile, TYPE(), ACL("Authorization"), aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("agent"), other, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("accessTo"), file, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("defaultForNew"), file, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("mode"), ACL("Read"), aclFile.doc()));

      let del = [];
      
      this.updateManager.update(del, ins, (uri, ok, message) => {
        if (ok) console.log('Reading permissions added successfully!');
        else console.error("An error occurred when adding the read permissions.")
      });
    });
  }

  /**
   * 
   * @param webid 
   */
  async getVCardName(webid: string): Promise<string> {
    let me = this.store.sym(webid);
    let name = "";

    await this.fetcher.load(me.doc()).then(response => {
      let nameFN = this.store.match(me, VCARD("fn"), null, me.doc()).map(st => { return (st.object.value) });
      let nameNAME = this.store.match(me, FOAF("name"), null, me.doc()).map(st => { return (st.object.value) });
      name = (nameFN != undefined && nameFN.length != 0)? nameFN.toString() : nameNAME.toString();
    });

    return name;
  }

  /**
   * 
   * @param webid 
   */
  async getVCardImage(webid: string): Promise<string> {
    let me = this.store.sym(webid);
    let image = "";
    
    await this.fetcher.load(me.doc()).then(response => {
      let imageURL = this.store.match(me, VCARD("hasPhoto"), null, me.doc()).map(st => { return (st.object.value) });
      image = (imageURL.length > 0)? imageURL[0].toString() : ""; // Seleccionamos la primera imagen (si la hay)
    });

    return image;
  }

  /**
   * 
   * @param webid 
   */
  async loadParticipantData(webid: string): Promise<Participant> {
    try {
      let imageURL = await this.getVCardImage(webid);
      let name = await this.getVCardName(webid);
      return new Participant(webid, imageURL, name);
    } catch (err) { console.error("An error occurred when loading the participant: " + err); }
  }

  /**
   * Example result: https://yourpod.solid.community
   */
  async getWebId(): Promise<string> {
    if (!this.session) {
      await this.getSession();
    }

    return this.session.webId;
  }


  /******************************* SOLID-FILE-CLIENT METHODS ********************************/

  /**
   * Crea un fichero vacío
   *
   * @param newFile
   */
  async createFile(newFile, content?, contentType?): Promise<string> {
    return fileClient.createFile(newFile, content, contentType)
        .then( fileCreated => { console.log(`Created file ${fileCreated}.`); return(fileCreated) }, err => console.log(err) );
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

  /**
   * 
   */
  async logout() {
    await fileClient.logout().then( console.log( `Bye now!` ), err => console.log(err) );
  }

  /**
   * 
   * @param url 
   */
  async fetch(url) {
    fileClient.fetch(url).then( results => {
      // do something with results
    }, err => {} ); // console.log(err) );
  }

  /***************************************************************/

  
  /**
   * Genera una URL única para un recurso.
   * Concatena a la URL pasada por parámetro un código aleatorio, formando una URL única.
   * 
   * @param baseurl 
   */
  async generateUniqueUrlForResource(baseurl): Promise<string> {
    if (!this.session) {
      await this.getSession();
    }

    try {
      let storeG = $rdf.graph();
      let timeout = 5000; // 5000 ms timeout
      let fetcherG = new $rdf.Fetcher(storeG, timeout);
      let url = storeG.sym(baseurl + uuid.v4());

      fetcherG.load(url.doc()).then(async response => {
        var d = await storeG.each(url);

        // Check if there are triples in the generated URL, if there are any we generate 
        // a new one and check again if it is free
        while (d.length != 0) {
          url = storeG.sym(baseurl + '#' + uuid.v4());
          d = await storeG.each(url);
        }
      }, err => {
        console.error("Load failed " +  err);
      });

      return url["value"];
    } catch (err) {
      console.error("An error occurred when generating the unique URL: " +  err);
    }
  }
  
  /**
   * Método que devuelve la lista de contactos de un usuario.
   */
  getFriends = async (list: { username: string; id: string }[]) => {
    if (!this.session) {
        await this.getSession();
    }
    try {
        var store = $rdf.graph();
        var timeout = 5000; // 5000 ms timeout
        var fetcher = new $rdf.Fetcher(store, timeout);

        let url = this.session.webId;

        fetcher.nowOrWhenFetched(url, async function (ok, body, xhr) {
            if (!ok) {
                console.log('Error getting the data');
            } else {
                const subject = $rdf.sym(url);
                const friends = await store.each(subject, FOAF('knows'));
                await friends.forEach(async (friend) => {
                    await fetcher.load(friend);
                    const webId = friend.value;
                    const nameNode = await store.any(friend, FOAF('name'));
                    let fullName = '';
                    if (nameNode == null || typeof (nameNode) === 'undefined') {
                        fullName = (webId.split('://')[1]).split('.')[0];
                    } else {
                        fullName = nameNode.value;
                    }

                    await list.push({username: fullName + '', id: webId});
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
  };

  /*******************************************************************************
   * Solución (temporal) para poder acceder a ficheros de un proveedor distinto al
   * de la cuenta con la que hemos iniciado sesión
   * 
   * Usado en:
   *  - loadChatChannels() [rdf.service.ts]
   *  - getParticipantsChatChannel() [rdf.service.ts]
   *  - processGroupMessage() [chat.service.ts]
  ********************************************************************************/
  fetcheatedParticipants = [];
  async fetchNewParticipant(webid: string) {
    if (!this.fetcheatedParticipants.includes(webid)) {
      this.fetcheatedParticipants.push(webid);
      this.store.sym(webid);
      // let uri = webid.match(this.chatUtils.regexUrlDomain)[0];
      // await fileClient.fetch(uri).then( results => {}, err => {} );
    }
  }

}