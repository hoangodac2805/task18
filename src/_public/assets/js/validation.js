function Validation(){
    this.kiemTraRong = function(value){
        if(value.trim() === ''){
            return true;
        }
        return false
    }
    this.kiemTraEmail = function(value){
         var re=
           /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           return re.test(value.toLowerCase())
    }
    this.kiemTraSoDT = function(value){
        var re =
          /^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/;
        if(re.test(value) && value.length >= 10){
            return true
        }
        return false
    }
    this.kiemTraPost = function(value){
          var re = /〒?[0-9]{3}-?[0-9]{4}/g;
          if (re.test(value)) {
            return true;
          }
          return false;
    }
    this.kiemTraTatCaLaChu = function (value) {
      var re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?1234567890]/;
      if (re.test(value))  {
        return false;
      }
      return true;
    };
}
