async function sendRepToBlockchain(){
    $(document).ready(function() {
        $("#full-loading").addClass("display-element");
    });
    var key = JSON.parse(sessionStorage.getItem("key"));
    var title = document.getElementById('text-rep').value;
    var desc = document.getElementById('text-desc').value;
    var tag = document.getElementById('text-tag').value;
    var appname = "permagithub-alice";
    var typecontent = "repository";
    var active = "true";
    var datecreated = Date.now();
    var r = Math.random().toString(36).substring(2);
    var s = Math.random().toString(25).substring(2);
    var id = r+""+s;

    try {
          let transaction = await arweave.createTransaction({
          data: '<html>Rep</html>',
          }, key);

          transaction.addTag('app-name', appname);
          transaction.addTag('type-content', typecontent);
          transaction.addTag('repository-name', title);
          transaction.addTag('repository-id', id);
          transaction.addTag('descriptions', desc);
          transaction.addTag('tag', tag);
          transaction.addTag('date-updated', datecreated);
          transaction.addTag('active', active);

          await arweave.transactions.sign(transaction, key);
          const response = await arweave.transactions.post(transaction);
          console.log(response.status);
          console.log(transaction);

          alert("Your repository have send to Blockchain. Please wait! This can take up to several minutes. !");

    } catch (e) {
          alert("Failed, Please try again !");
    } finally {
      $(document).ready(function() {
          $("#full-loading").removeClass("display-element");
      });
    }


}
