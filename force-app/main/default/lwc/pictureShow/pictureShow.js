import { LightningElement, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getPictureUrl from '@salesforce/apex/PictureShowController.getPictureUrl';
import { getRecord  } from 'lightning/uiRecordApi';

export default class PictureShow extends LightningElement {
    @api recordId;
    @api objectName;
    @api objectApiName;

    pictureUrl;
    pictureField;

    connectedCallback() {
        if(this.objectApiName==='Person__c') {
            this.pictureField = 'Person__c.Picture__c';
        }
        if(this.objectApiName==='Pet__c') {
            this.pictureField = 'Pet__c.Picture__c';
        }
        if(this.objectApiName==='Toy__c') {
            this.pictureField = 'Toy__c.Picture__c';
        }
    }

    @wire(getRecord,{recordId: '$recordId',fields: '$pictureField'})
    objRec({error, data}) {
        if (data) {
            this.pictureUrl = data.fields.Picture__c.value;
            console.log("pictureUrl set: ", this.pictureUrl);
            if(this.pictureUrl === null || this.pictureUrl === undefined){
                    if(this.objectApiName==='Person__c') {
                        this.pictureUrl = "https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png";
                    }
                    if(this.objectApiName==='Pet__c') {
                        this.pictureUrl = "https://pbs.twimg.com/profile_images/446279626831044608/aCs3t5qe_400x400.png";
                    }
                    if(this.objectApiName==='Toy__c') {
                        this.pictureUrl = "https://c8.alamy.com/comp/APJMTW/toy-wooden-block-question-mark-red-symbol-sign-APJMTW.jpg";
                    }                
            }
        } else {
            this.error = error;
        }
    }

    /*@wire(getPictureUrl, { objectName: '$objectApiName', objectId: '$recordId'})
    wiredObject({ error, data }) {
        if (data) {
            this.pictureUrl = data.Picture__c;
        } else if (error) {
            
        }
    }*/

    /*connectedCallback(){
        console.log("Callback called");
            getPictureUrl({ objectName: this.objectName, objectId: this.recordId
            }).then(resp => {
                this.pictureUrl = resp.Picture__c;
                console.log("pictureUrl set: ", this.pictureUrl);
            }).catch(err => {})
    }*/
}