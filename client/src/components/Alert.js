import React from 'react'


export const Alert = (props) => {
    const showAlert = (message, className) => {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);
    
        // Timeout after 3 sec
        setTimeout(function(){
          document.querySelector('.alert').remove();
        }, 3000);
      }
  return (
    <div>Alert</div>
  )
}

{/*         "text[0].name": 1,
         "text[0].content": reqBook.text */}