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
    published: "true",
    title: "english Orale blog",
    category: "blog",
    language: "english",
    comments: "true",
    tags: ["tag1", "tag2"],
    author: "Perry",
    affiliation: "IFPRI",
    splash: "https://farm8.staticflickr.com/7498/16147010630_f59f6a7f00_o.jpg",
    content: "Poverty in the Middle East and North Africa (MENA) is largely a rural phenomenon."
}

//var mockPost = {
//    layout: "blog",
//    published: "true",
//    title: "arabic3 blog",
//    category: "blog",
//    language: "arabic",
//    comments: "true",
//    tags: ["التعاون الاقليمي","التعاون الاقليمي", "test", "test2"],
//    author: "Perry",
//    affiliation: "IFPRI",
//    splash: "https://www.usarab.com/images/arab-map.gif",
//    content: "إن التغذية الجيدة مهمة أيضا في أجندة التنمية المستدامة التي تتبلور في شكل أهداف التنمية المستدامة  قيد النقاش حاليا.  إن الحفاظ على التغذية الجيدة بشكل فطري يؤدي إلى تدفقها على امتداد دورة الحياة وعبر الأجيال. إن  التغذية تدعم قدرة الفرد على الصمود في وجه الصدمات و حالات عدم اليقين التي يسببها تغير المناخ والتقلبات السعرية المفرطة. كما تدعم التغذية جيلا من الابتكارات المطلوبة  لتلبية  التحدي المشترك لتحسين حياة الأجيال الحالية والقادمة بأساليب تحقق الاستدامة البيئية.قامت مجموعة من الدول والمنظمات والباحثين والأكاديميين، تحت قيادة المعهد الدولي لبحوث السياسات الغذائية، بإطلاق أول تقرير مفصل حول الصحة العالمية والتقدم القُطري في اتجاه  الحد من سوء التغذية في سائر أنحاء العالم.  يقدم [تقرير التغذية العالمي](http://www.ifpri.org/sites/default/files/publications/gnr14.pdf) (بالانجليزية) النمط العالمي إضافة إلى الأنماط القطرية فيما يتصل بالتغذية في كل من الدول الأعضاء بالأمم المتحدة وعددها 193، كما يتضمن تقدما محددا لكل دولة. ولقد كان التقرير محور المؤتمر الدولي الثاني للتغذية الذي عُقد في روما في الفترة من 19 -21 نوفمبر، ونظمته كلا من منظمة الأغذية  و الزراعة ( الفاو) ومنظمة الصحة العالمية.  إن تقرير التغذية العالمية هذا هو الأول في مجموعة من التقارير السنوية.  يرصد التقرير التقدم العالمي في تحسين وضع التغذية؛ ويحدد الاختناقات التي تستلزم التغيير؛ ويبرز الفرص المتوافرة للتصرف؛ ويساهم في تعزيز المساءلة في مجال التغذية. إن هذه المجموعة من التقارير هي نتاج التزام الموقعين في مؤتمر قمة التغذية من أجل النمو في عام 2013. وتقوم مجموعة واسعة النطاق من أصحاب المصلحة بدعم التقرير ويقدمه مجموعة مستقلة من الخبراء بشراكة مع عدد كبير من المساهمين الخارجيين."
//}

var github = new Github({
    token: githubCreds.token,
    auth: githubCreds.auth
});

var repo = github.getRepo(congfigSettings.ACCUSR, congfigSettings.REPO);

function init(){

    getListOfMDFiles();


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
//    console.log(postdata);
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
    var d = new Date();

    var year = d.getFullYear();
    var month = ("0" + (d.getMonth() + 1)).slice(-2)
    var day = d.getDay();

    var postStampDate = year + " " + month + " " + day;

    text = postStampDate + " " + text;

        return text.replace(/\s+/g, '-').toLowerCase();
    }

function buildYMAL() {

//    var tagsArrayList = mockPost.tags;

    function postArrays(tagsArrayList) {
        var tagString = "\n"
        _.each(tagsArrayList, function (tag, index) {

            tagString += '  - ' + tag + '\n';


        });
//        console.log(tagString);
        return tagString;
    }

    var YAML_FRONT_MATTER = '---\n' +
        'layout: '+ mockPost.layout + '\n' +
        'published: '+ mockPost.published + '\n' +
        'title: %title\n' +
        'category: '+ mockPost.category + '\n' +
        'language: '+ mockPost.language + '\n' +
        'comments: '+ mockPost.comments + '\n' +
        'splash: '+ mockPost.splash + '\n' +
        'tags: ' + postArrays(mockPost.tags) + '\n' +
        '---\n\n';
    return YAML_FRONT_MATTER;
}

function buildPost(title, data) {
    filename = formatTtitle(title);
    var getYMAL = buildYMAL();
    yaml = getYMAL.replace('%title', title);

    post = {
        filename: filename + '.md',
        body: yaml + data
    };
    console.log("[post] = ", post );

    return post;
}


