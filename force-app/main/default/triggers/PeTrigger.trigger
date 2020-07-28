trigger PeTrigger on Pet__c (before insert) {
    Set<Id> ownerIds = new Set<Id>();
    for(Pet__c pet : Trigger.new){
        ownerIds.add(pet.Person__c);
    }
    Map<Id, Person__c> owners = new Map<Id, Person__c>([SELECT Id, Name, (SELECT Id FROM Pets__r) FROM Person__c WHERE Id IN: ownerIds]);
    for(Pet__c pet : Trigger.new){
        if(owners.get(pet.Person__c).Pets__r.size() > 2){
            pet.addError('Mother said, you have already ' + owners.get(pet.Person__c).Pets__r.size() + ' pets.');
        }
    }
}