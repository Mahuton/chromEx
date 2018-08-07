let option_input = document.getElementById('custom-option');
let option_button = document.getElementById('option-button');
let option_sucess_message = document.getElementById('option-success-message');
var option_set = '';
var save_option = function() {
  if( option_button != undefined ){
       option_button.addEventListener('click', function(){
         if (option_input.value.length > 0 ) {
           option_set = option_input.value;
           chrome.storage.sync.set({'custom_option': option_set }, function() {
             //console.log(option_set + ' is saved as option');
             toogle_message_class("option saved with success!");
           });
         }
         else{
           chrome.storage.sync.set({'custom_option': 'City'}, function(){
              //console.log('Default option saved');
              toogle_message_class("we saved wallpaper as default option");
           });
         }
       });
     }else{
       chrome.storage.sync.set({'custom_option': 'City'}, function(){
       });
     }

     };

//manage the success message display
var toogle_message_class = function(msg){
  if( option_sucess_message.classList.contains('hide-message') ){
    option_sucess_message.classList.replace('hide-message','show-message');
    option_sucess_message.textContent = msg ;
  }
};

save_option();
