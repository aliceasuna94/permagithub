async function sendFileToBlockchain(){
    $(document).ready(function() {
        $("#full-loading-a").addClass("display-element");
    });
    var key = JSON.parse(sessionStorage.getItem("key"));
    var repid = project.replace('?','');
    var filename = document.getElementById('text-file').value;
    var comment = document.getElementById('text-com').value;
    var code = document.getElementById('text-code').value;
    var appname = "permagithub-alice";
    var typecontent = "file";
    var active = "true";
    var datecreated = Date.now();
    var r = Math.random().toString(36).substring(2);
    var s = Math.random().toString(25).substring(2);
    var id = r+""+s;

    try {
        let transaction = await arweave.createTransaction({
        data: code,
        }, key);

        transaction.addTag('app-name', appname);
        transaction.addTag('type-content', typecontent);
        transaction.addTag('repository-id', repid);
        transaction.addTag('file-name', filename);
        transaction.addTag('file-id', id);
        transaction.addTag('comment', comment);
        transaction.addTag('date-updated', datecreated);
        transaction.addTag('active', active);

        await arweave.transactions.sign(transaction, key);
        const response = await arweave.transactions.post(transaction);
        console.log(response.status);
        console.log(transaction);

        alert("Your file have send to Blockchain. Please wait! This can take up to several minutes. !");

    } catch (e) {
        alert("Failed, Please try again !");
    } finally {
        $(document).ready(function() {
            $("#full-loading-a").removeClass("display-element");
        });
    }

}
