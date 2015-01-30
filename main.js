/**
 * Created by renerodriguez on 1/27/15.
 */

var GithubSync = function () {

    this.congfigSettings = {
        "USERNAME": "Yifei.liu@cgiar.org",
        "PASSWORD": "arab2014",
        "ACCUSR": "IFPRMENA",
        "REPO": "arabspatialblog3",
        "BRANCH": "gh-pages",
        "PATH": "_posts/blog"
    }

    this.mockPost = {
        layout: "blog",
        published: "true",
        title: "TEST english blog post",
        category: "blog",
        language: "english",
        comments: "true",
        tags: ["tag1", "tag2"],
        author: "Perry",
        affiliation: "IFPRI",
        splash: "https://farm8.staticflickr.com/7498/16147010630_f59f6a7f00_o.jpg",
        youtubeid: "",
        content: "Poverty in the Middle East and North Africa (MENA) is largely a rural phenomenon.",
        commitmsg: ""
    }

    this.github = new Github({
        token: githubCreds.token,
        auth: githubCreds.auth
    });

    this.repo = this.github.getRepo(this.congfigSettings.ACCUSR, this.congfigSettings.REPO);


    this.getListOfMDFiles = function () {
        var self = this;
        this.repo.contents(this.congfigSettings.BRANCH, this.congfigSettings.PATH, function (err, contents) {
            var shaID = contents[0].sha;
            var readPostMD = contents[0].path;
            console.log(contents);

//            self.getRawPostMD(shaID);

//            self.readRawPostMD(readPostMD);


        });
    }

//    this.deleteFilePost = function (path){
//
//    }

//Reads the RAW data from Github
    this.getRawPostMD = function (shaID) {
        this.repo.getBlob(shaID, function (err, data) {
            console.log("[data] = ", data);
        });
    }

//writes the RAW file from postObject github
    this.writeFileToGithub = function (title, content) {
        var postdata = this.buildPost(title, content);
//    console.log(postdata);
        this.repo.write(this.congfigSettings.BRANCH, this.congfigSettings.PATH + "/" + postdata.filename, postdata.body, 'test for write files', function (err) {
            if (err) {
                console.log("something went wroong");
            } else {
                console.log("cool");
            }

        });

    }

//    var path = "_posts/blog/2015-01-28-date23.md";

    this.getShaPost = function (){
        this.repo.getSha(this.congfigSettings.PATH, "_posts/blog/2015-01-28-date23.md", function(err, sha){
            if (err) {
                console.log("something went wroong");
            } else {
                console.log("sha = " + sha);
            }
        });
    }

    this.deleteFile = function (filename){
        console.log(filename);
        this.repo.delete(this.congfigSettings.BRANCH, this.congfigSettings.PATH + "/" + filename, function(err) {
//            if (err) {
//                console.log("something went wroong");
//            } else {
//                console.log("Deleted = ");
//            }
            console.log(err);
        });
    }

//this.writeFileToGithub(GithubSync.mockPost.title, GithubSync.mockPost.content)

    this.formatTitle = function (text) {
        var d = new Date();

        var year = d.getFullYear();
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
//        var day = ("0" + (d.getDay() + 1)).slice(-2);
        var day = d.getDate();

        var postStampDate = year + " " + month + " " + day;

        text = postStampDate + " " + text;

        return text.replace(/\s+/g, '-').toLowerCase();
    }

    this.buildYMAL = function () {


        function postArrays(tagsArrayList) {
            var tagString = "\n"
            _.each(tagsArrayList, function (tag, index) {

                tagString += '  - ' + tag + '\n';


            });
//        console.log(tagString);
            return tagString;
        }

        var YAML_FRONT_MATTER = '---\n' +
            'layout: ' + this.mockPost.layout + '\n' +
            'published: ' + this.mockPost.published + '\n' +
            'title: %title\n' +
            'category: ' + this.mockPost.category + '\n' +
            'language: ' + this.mockPost.language + '\n' +
            'comments: ' + this.mockPost.comments + '\n' +
            'splash: ' + this.mockPost.splash + '\n' +
            'tags: ' + postArrays(this.mockPost.tags) + '\n' +
            '---\n\n';
        return YAML_FRONT_MATTER;
    }

    this.buildPost = function (title, data) {
        filename = this.formatTitle(title);
        var getYMAL = this.buildYMAL();
        yaml = getYMAL.replace('%title', title);

        post = {
            filename: filename + '.md',
            body: yaml + data
        };
        console.log("[post] = ", post);

        return post;
    }

}


