//Business Logic for AddressBook-----
  function AddressBook() {
    this.contacts = [],
    this.currentId = 0
  }

  AddressBook.prototype.addContact = function(contact) {
    contact.id= this.assignId();
    this.contacts.push(contact);
    }
  AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
  }
  AddressBook.prototype.findContact = function(id) {
    for (var i=0; i<this.contacts.length; i++){
      if (this.contacts[i]){
        if (this.contacts[i].id == id) {
          return this.contacts[i];
        }
      }
    };
    return false;
  }
  AddressBook.prototype.deleteContact = function(id) {
    for (var i=0; i<this.contacts.length; i++) {
      if (this.contacts[i]) {
        if (this.contacts[i].id == id) {
          delete this.contacts[i];
          return true;
        }
      }
    };
  return false;
}

AddressBook.prototype.addAddress = function () {

}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, homeAddress, workAddress, picture, personalEmail, workEmail) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.homeAddress = homeAddress,
  this.workAddress = workAddress
  this.picture = picture,
  this.personalEmail = personalEmail,
  this.workEmail = workEmail
}

Contact.prototype.fullName = function() {
  return this.firstName + " "+this.lastName;
}
//User interface logic
var addressBook = new AddressBook();

function attachContactListeners() {
  $("ol#contacts").on("click", "li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#showContact").hide();
    displayContactDetails(addressBook);
  });
  $("#findFunction").keyup(function() {
    showContact($("#findFunction").val());
    displayContactDetails(addressBook);
  });
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#showContact").show();
  $(".firstName").html(contact.firstName);
  $(".lastName").html(contact.lastName);
  $(".phoneNumber").html(contact.phoneNumber);
  $(".homeAddress").html(contact.homeAddress);
  $(".workAddress").html(contact.workAddress);
  $(".picture").html(contact.picture);
  $(".personalEmail").html(contact.personalEmail);
  $(".workEmail").html(contact.workEmail);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ol#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>" + "<hr>";
  });
  contactsList.html(htmlForContactInfo);

};
function readURL(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e){
      $("#newPicture").attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$(document).ready(function(){
  attachContactListeners();
  $("form#new-Contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#newFirst").val();
    var inputtedLastName = $("input#newLast").val();
    var inputtedPhoneNumber = $("input#newNumber").val();
    var inputtedHomeAddress = $("input#homeAddress").val();
    var inputtedWorkAddress = $("input#workAddress").val();
    var inputtedPicture = '<img src="'+ $("#newPicture").attr("src")+'">';
    var inputtedPersonalEmail = $("input#personalEmail").val();
    var inputtedWorkEmail = $("input#workEmail").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedHomeAddress, inputtedWorkAddress, inputtedPicture, inputtedPersonalEmail, inputtedWorkEmail);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
