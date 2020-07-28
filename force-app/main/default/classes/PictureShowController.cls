public with sharing class PictureShowController {

    @AuraEnabled (cacheable = true)
    public static SObject getPictureUrl(String objectName, String objectId){
        System.debug('CF - query: ' + 'SELECT Picture__c FROM ' + objectName + ' WHERE Id = \'' + objectId + '\'');
        return Database.query('SELECT Picture__c FROM ' + objectName + ' WHERE Id = \'' + objectId + '\'');
    }
}
