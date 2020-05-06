const arweave = Arweave.init({host:"arweave.net",port:443,logging:!0,protocol:"https"});

function openNextwallet() {
                const input = document.getElementById('next-wallet');
                if (input) {
                    input.addEventListener('change', function () {
                        const reader = new FileReader();
                        reader.addEventListener('load', function(e) {
                            jwk = e.target.result;
                        });
                        reader.onload = function() {
                            jwk = JSON.parse(jwk);
                            arweave.wallets.jwkToAddress(jwk).then((address) => {
                                wallet_address = address;
                                arweave.wallets.getBalance(wallet_address).then((balance) => {
                                    try {
                                        sessionStorage.setItem("wallet", wallet_address);
                                        sessionStorage.setItem("key", JSON.stringify(jwk));
                                        window.location.href = window.location.href;
                                    } catch(err) {
                                        console.log(err);
                                    }

                                });
                            });
                        }
                        reader.readAsText(input.files[0]);

                    }, false);
                }
}

function goto () {
                $("#next-wallet").click();
                openNextwallet();
}

function logout(){
    sessionStorage.removeItem("key");
    location.reload();
}

var lastname = JSON.parse(sessionStorage.getItem("key"));
var firstname = sessionStorage.getItem("wallet");
const queryString = window.location.search;
var the_string = queryString;
var parts = the_string.split('/', 2);
var project  = parts[0];
var file     = parts[1];

let ar = "";
arweave.wallets.getBalance(firstname).then((balance) => {
    let winston = balance;
    ar = arweave.ar.winstonToAr(balance);
    $(document).ready(function() {
        $("#balance-info").append(ar);
        $('#walletinfo').prepend(firstname);
    });
});

var projectnew = project.replace('?','');

if (project === void undefined) {
    var project  = "";
}else{
    var project  = parts[0];
}

if (file === void undefined) {
    var file  = "";
}else{
    var file  = parts[1];
}

if (lastname==null) {
      $(document).ready(function() {
      $("#main-content").addClass("hide-element");
    });
}else {
      $(document).ready(function() {
      $("#sub-home").addClass("hide-element");
    });

    if(project=="" && file==""){
          showRepository();
          $(document).ready(function() {
          $("#project-list").addClass("hide-element");
          $("#file-list").addClass("hide-element");
          $("#add-files").addClass("hide-element");
          $("#add-repository").addClass("hide-element");
          $("#full-loading").addClass("display-element");
        });
    }else if (project!="" && file=="") {
          if (project=="?new") {
                $(document).ready(function() {
                $("#repository-list").addClass("hide-element");
                $("#file-list").addClass("hide-element");
                $("#add-files").addClass("hide-element");
                $("#project-list").addClass("hide-element");

              });
          }else {
                showProject();
                showProjectList();
                $(document).ready(function() {
                $('#div-button').append('<a href="?'+projectnew+'/new"><button class="new-file">+ New File</button><a>');
                $("#repository-list").addClass("hide-element");
                $("#file-list").addClass("hide-element");
                $("#add-files").addClass("hide-element");
                $("#add-repository").addClass("hide-element");
                $("#full-loading").addClass("display-element");
              });
          }

    }else if (project!="" && file!="") {
          if (file=="new") {
                $(document).ready(function() {
                $("#repository-list").addClass("hide-element");
                $("#project-list").addClass("hide-element");
                $("#file-list").addClass("hide-element");
                $("#add-repository").addClass("hide-element");

              });
          }else {
                showFile();
                $(document).ready(function() {
                $("#repository-list").addClass("hide-element");
                $("#project-list").addClass("hide-element");
                $("#add-files").addClass("hide-element");
                $("#add-repository").addClass("hide-element");

              });
          }
    }
}

async function showRepository(){
    try {
      var wallet = sessionStorage.getItem("wallet");
      const transaction = await arweave.arql({
            op: "and",
            expr1: {
              op: "equals",
              expr1: "from",
              expr2: wallet
            },
            expr2: {
                op:"equals",
                expr1:"type-content",
                expr2:"repository"
            }
      })
        console.log(transaction);
        transaction.forEach(async function(item, index){
              const transaction = arweave.transactions.get(item).then(transaction => {
              let arr = [];
        			transaction.get('tags').forEach(tag => {
        			let value = tag.get('value', {decode: true, string: true});
              let key = tag.get('name', {decode: true, string: true});
              arr.push(value);

        		});
                var a = arr[0];
                var b = arr[1];
                var c = arr[2];
                var d = arr[3];
                var e = arr[4];
                var f = arr[5];
                var g = arr[6];
                var h = arr[7];

                var gg = g.substring(0, 10);
                var ggg = moment.unix(gg).format("MMM Do YYYY");

                var fa = f.split(',');
                var fab = '';
                for (i = 0; i < fa.length; i++) {
                    fab += '<p class="rep-lang">'+ fa[i] +'</p>';
                }

                if (h == "true") {
                  $('#my-list').append('<div class="repository-list"><p class="rep-title"><a href="?'+d+'" class="rep-title-link">'+c+'</a></p><p class="desc">'+e+'</p><div>'+fab+'<p class="rep-date">'+ggg+'</p></div></div>');

                }
              })

    		});

    } catch (err) {
          if (confirm("Failed to get data, Please Reload")) {
              window.location.href = window.location.href;
          } else {
              window.location.href = window.location.href;
          }
    } finally {
        $(document).ready(function() {
          $("#my-list").removeClass("hide-element");
          $("#my-list").addClass("display-element");
          $("#full-loading").removeClass("display-element");
        });
    }
}


async function showProject() {

    try {
      var wallet = sessionStorage.getItem("wallet");
      const transaction = await arweave.arql({
            op: "and",
            expr1: {
              op: "equals",
                expr1: "type-content",
                expr2: "repository"
            },
            expr2: {
                op:"equals",
                expr1:"repository-id",
                expr2: projectnew

            }
      })
        console.log(transaction);

              const trx = arweave.transactions.get(transaction).then(transaction => {
              let arr = [];
              transaction.get('tags').forEach(tag => {
              let value = tag.get('value', {decode: true, string: true});
              let key = tag.get('name', {decode: true, string: true});
              arr.push(value);

            });
                var a = arr[0];
                var b = arr[1];
                var c = arr[2];
                var d = arr[3];
                var e = arr[4];
                var f = arr[5];
                var g = arr[6];
                var h = arr[7];

                var gg = g.substring(0, 10);
                var ggg = moment.unix(gg).format("MMM Do YYYY");

                var fa = f.split(',');
                var fab = '';
                for (i = 0; i < fa.length; i++) {
                    fab += '<p class="rep-lang">'+ fa[i] +'</p>';
                }

                if (h == "true") {
                  $('#my-file-list').append('<div class="repository-list"><p class="rep-title"><a href="?'+d+'" class="rep-title-link">'+c+'</a></p><p class="desc">'+e+'</p><div>'+fab+'<p class="rep-date">'+ggg+'</p></div></div>');

                }
              })

    } catch (err) {
          if (confirm("Failed to get data, Please Reload")) {
              window.location.href =   window.location.href+"?"+projectnew;
          } else {
              window.location.href =   window.location.href+"?"+projectnew;
          }
        } finally {
          $(document).ready(function() {
            $("#my-file-list").removeClass("hide-element");
            $("#my-file-list").addClass("display-element");
            $("#full-loading").removeClass("display-element");
          });
    }
}

async function showProjectList() {
    console.log("this url: "+projectnew);
    try {
      var wallet = sessionStorage.getItem("wallet");
      const transaction = await arweave.arql({
            op: "and",
            expr1: {
                op:"equals",
                expr1:"repository-id",
                expr2: projectnew
            },
            expr2: {
              op: "equals",
                expr1: "type-content",
                expr2: "file"
            }

      })
        console.log(transaction);
        transaction.forEach(async function(item){
              const trx = arweave.transactions.get(item).then(transaction => {
              let arr = [];
              transaction.get('tags').forEach(tag => {
              let value = tag.get('value', {decode: true, string: true});
              let key = tag.get('name', {decode: true, string: true});
              arr.push(value);

            });
                var a = arr[0];
                var b = arr[1];
                var c = arr[2];
                var d = arr[3];
                var e = arr[4];
                var f = arr[5];
                var g = arr[6];
                var h = arr[7];

                var gg = g.substring(0, 10);
                var ggg = moment.unix(gg).format("MMM Do YYYY");

                if (h == "true") {
                      $('#table-file').append('<tr><td class="td-file"><i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;&nbsp;<a href="?'+projectnew+'/'+item+'" class="file-link">'+d+'<a></td><td>'+f+'</td><td class="td-date">'+ggg+'</td></tr>');
                }
              })
      	});
    } catch (err) {
          if (confirm("Failed to get data, Please Reload")) {
              window.location.href =   window.location.href+"?"+projectnew;
          } else {
              window.location.href =   window.location.href+"?"+projectnew;
          }
        } finally {
          $(document).ready(function() {
            $("#my-file-list").removeClass("hide-element");
            $("#my-file-list").addClass("display-element");
            $("#full-loading").removeClass("display-element");
          });
    }
}

async function showFile(){
    var idfile = file;
    try {
      arweave.transactions.getData(idfile, {decode: true, string: true}).then(data => {
        console.log(data);
        $('#file-details-code').append('<div class="show-code-title"><i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;&nbsp; Code files</div><div class="show-code"><xmp>'+data+'</xmp></div>');

      });


    } catch (err) {
        if (confirm("Failed to get data, Please Reload")) {
            window.location.href =   window.location.href+"?"+projectnew+"/"+idfile;
        } else {
            window.location.href =   window.location.href+"?"+projectnew+"/"+idfile;
        }
    } finally {
      $(document).ready(function() {
          $("#full-loading").removeClass("display-element");
      });
    }
}

async function addRepositoryConfirm() {
    var title = document.getElementById('text-rep').value;
    var desc = document.getElementById('text-desc').value;
    var tag = document.getElementById('text-tag').value;
    var size =  new Blob(['<html>Rep</html>']).size;
    let checking = await fetch('https://arweave.net/price/'+size);
    let result = await checking.text();
    let fee = ( result/1000000000000 );

    if (title != "" && desc != "" && tag != "") {

        if (fee <= ar) {
              if (confirm("Are you sure to create repository? you can't delete or edit your repository after saved to Blockchain!")) {
                    sendRepToBlockchain();
              } else {

              }
        }else{
            alert("You must have minimun "+fee+" AR to save !");
        }
    }else {
        alert("Please fill all form !");
    }
}

async function addFileConfirm() {
    var filename = document.getElementById('text-file').value;
    var comment = document.getElementById('text-com').value;
    var code = document.getElementById('text-code').value;
    var size =  new Blob([code]).size;
    let checking = await fetch('https://arweave.net/price/'+size);
    let result = await checking.text();
    let fee = ( result/1000000000000 );
    console.log(fee);
    if (filename != "" && comment != "" && code != "") {

        if (fee <= ar) {
              if (confirm("Are you sure to save this file? you can't delete or edit your file after saved to Blockchain!")) {
                    sendFileToBlockchain();
              } else {

              }
        }else{
            alert("You must have minimun "+fee+" AR to save !");
        }
    }else {
        alert("Please fill all form !");
    }
}
