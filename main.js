/**
 * Created by renerodriguez on 1/27/15.
 */

var congfigSettings = {
    "USERNAME": "Yifei.liu@cgiar.org",
    "PASSWORD": "arab2014",
    "ACCUSR": "IFPRMENA",
    "REPO": "arabspatialblog3",
    "BRANCH": "gh-pages",
    "PATH": "_posts/blog"
}

var github = new Github({
    username: congfigSettings.USERNAME,
    password: congfigSettings.PASSWORD,
    auth: "basic"
});

var repo = github.getRepo(congfigSettings.ACCUSR, congfigSettings.REPO);

function init(){

    getListOfMDFiles();

    writeFileToGithub();

}

function getListOfMDFiles() {
    repo.contents(congfigSettings.BRANCH, congfigSettings.PATH, function (err, contents) {
        var shaID = contents[0].sha;
        var readPostMD = contents[0].path;
        console.log(contents);

        getRawPostMD(shaID);

        readRawPostMD(readPostMD);


    });
}

//Reads the RAW data from Github
function getRawPostMD(shaID){

    repo.getBlob(shaID, function(err, data) {

//        console.log("[data] = ", data);
    });

}

//Reads the RAW file from Github
function readRawPostMD(path){

    repo.read(congfigSettings.BRANCH, path, function(err, data) {
//        console.log("[read] = ", data);
    });
}

function writeFileToGithub(){

    repo.write(congfigSettings.BRANCH, congfigSettings.PATH + "/orale1.md", 'ArabSpatialisAwesome', 'test for write files', function(err) {

        if (err){
            console.log("something went wroong");
        }else{
            console.log("cool");
        }


    });

}
