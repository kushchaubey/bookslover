var handleSearchBox = function(){
      var searchBox = document.getElementById("searchBox");
        searchBox.onkeyup= function(e){
            var key = e.target.value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  document.getElementById("allbooks").innerHTML =this.responseText;
              }
            };
            xhttp.open("POST", "/allbooks", true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

            xhttp.send(`keyword=`+key);
      }

    }
handleSearchBox();