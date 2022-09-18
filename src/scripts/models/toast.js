export class ToastIndex{
    static creat(text, color){
        Toastify({
            text: text,
            duration: 4000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "white",
              color: color,
              
              
            },
            onClick: function(){} // Callback after click
          }).showToast();
    }
}

export class ToastUserReg{
  static creat(text, color){
    Toastify({
        text: text,
        duration: 4000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "white",
          color: color,        
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
}


    