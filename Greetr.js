//IIFE
;(function(global, $) {

  //function expression: "new" an object
  var Greetr = function(firstname, lastName, language){
      //function constructor to generate the object
      //"new" is use so we don't have to use it everytime that we create a new object.
      return new Greetr.init(firstname, lastName, language);
  }

 //Thanks to Closures  Greetr.init() has access to the variables listed below
 //Hidden within the scope of the IIFE and never directly accessible
 var supportedLanguages = ['en', 'es'];

 var greetings = {
   'en': 'Hello',
   'es': 'Hola'
 };

 var formalGreetings = {
   'en': 'Greetings',
   'es': 'Saludos'
 };

 var logMessages = {
   en: 'Logged in',
   es: 'Inicio Session'
 };

 //Methods to be shared by all the new objects created
 Greetr.prototype = {

   fullName: function(){
     return this.firstName + ' ' + this.lastName;
   },

   validate: function(){
     if (supportedLanguages.indexOf(this.language) === -1) {
       throw "Invalid Language";
     }
   },

   greeting: function(){
     return greetings[this.language] + ' ' + this.firstName + "!";
   },

   formalGreeting: function(){
     return formalGreetings[this.language] + ', ' + this.fullName();
   },

   //Encapsulation
   greet: function(formal){
     var msg;
     //if undefined or null it will be coerced to 'false'
     if (formal){
       msg = this.formalGreeting();
     }
     else {
       msg = this.greeting()
     }
     if (console) {
       console.log(msg);
     }
     // 'this' refers to the calling object at execution time
     //makes the method chainable
     return this;
   },

   log: function(){
      if (console){
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }
      //makes the method chainable, refers to the object instance on which the method is currently being called.
      return this;
   },

   setLang: function(lang){
      this.language = lang;
      this.validate();
      return this;
   },

   HTMLGreeting: function(selector, formal){
     if (!$){
       throw 'jQuery not loaded';
     }

     if (!selector){
       throw 'Missing jQuery selector';
     }
     //Sets up the greetig itself
     var msg;
     if (formal){
       msg = this.formalGreeting();
     }
     else{
       msg = this.greeting();
     }

     $(selector).html(msg);

     return this;
   }


 };//Ends object literal

  //Lexical Environment is everything inside the IIF (function(global, $) {...}
  //function expression or Greetr Constructor
  Greetr.init = function(firstName, lastName, language){

    var self = this;
    //[Good practice] Self is referencing to the current object and always is going to be
    //"this" can be referring to either the global object or to the current oject,it depend on the scope, which can be a problem sometimes
    self.firstName = firstName || ''  ;
    self.lastName  = lastName  || ''  ;
    self.language  = language  || 'en';

    self.validate();

  }

  //trick borrewed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;

  //In the global object Greetr and G$ are going to point to the function expression Greetr that return the Greetr.init object
  global.Greetr = global.G$ = Greetr;


 }(window, jQuery)); //IIF ends
