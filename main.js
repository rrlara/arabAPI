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

var mockPost = {
    layout: "blog",
    published: "false",
    title: "orale orale",
    category: "blog",
    language: "arabic",
    comments: "true",
    tags: ["tag1", "tag2"],
    author: "IFPRI",
    splash: "https://farm8.staticflickr.com/7498/16147010630_f59f6a7f00_o.jpg",
    content: "Poverty in the Middle East and North Africa (MENA) is largely a rural phenomenon."
}

//var github = new Github({
//    username: congfigSettings.USERNAME,
//    password: congfigSettings.PASSWORD,
//    auth: "basic",
//    key: "ce7632587d588ff261c27f84232fbae07112d6df"
//});

var github = new Github({
    token: "ce7632587d588ff261c27f84232fbae07112d6df",
    auth: "oauth"
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

function writeFileToGithub(title, content){

    var postdata = buildPost(title, content);

    console.log(postdata);

    repo.write(congfigSettings.BRANCH, congfigSettings.PATH + "/" + postdata.filename, postdata.body, 'test for write files', function(err) {

        if (err){
            console.log("something went wroong");
        }else{
            console.log("cool");
        }


    });

}

writeFileToGithub(mockPost.title, mockPost.content)

function formatTtitle(text) {
        return text.replace(/\s+/g, '-').toLowerCase();
    }


function JekyllBuilder() {
    var YAML_FRONT_MATTER = '---\n' +
        'layout: blog\n' +
        'title: %title\n' +
        '---\n\n';
    return YAML_FRONT_MATTER;
}

function buildPost(title, data) {
    filename = formatTtitle(title);
    var getYMAL = JekyllBuilder();
    yaml = getYMAL.replace('%title', title);

    post = {
        filename: filename + '.md',
        body: yaml + data
    };
    console.log("[post] = ", post );

    return post;
}

//buildPost(mockPost.title, mockPost.content);
