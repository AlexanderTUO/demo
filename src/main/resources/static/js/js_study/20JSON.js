window.onload = function (ev) {
    var book = {
        title:"JavaScript高级程序设计",
        authors:"Nicholas C. Zakas",
        edition:3,
        year:2011,
        releaseDate: new Date()
    }

    var jsonText = JSON.stringify(book);
    console.log('过滤结果一');
    var jsonText2 = JSON.stringify(book,["title","edition"]);
    console.log(jsonText2)

    var jsonText3 = JSON.stringify(book,function (key,value) {
        switch (key) {
            case "authors":
                return value;
            case 'title':
                return undefined;
            case "year":
                return 5000;
            default:
                return value;
        }
    });
    console.log(jsonText3);

    var bookCopy = JSON.parse(jsonText);
    var bookCopy2 = JSON.parse(jsonText,function (key,value) {
        if (key === "releaseDate") {
            return new Date(value);
        } else {
            return value;
        }
    });
}