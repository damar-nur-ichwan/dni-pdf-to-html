var https = require("https");
var path = require("path")
var fs = require("fs");
var request = require("request");

function PDFtoHTML(InputPath,OutputPath){
const API_KEY = "damarnurichwan.official@gmail.com_c689e1db10dc13cd";
const SourceFile = InputPath;
const Pages = "";
const Password = "";
const DestinationFile = OutputPath;
const PlainHtml = 'False';
const ColumnLayout = 'False';

var query = `https://api.pdf.co/v1/pdf/convert/to/html`;
let reqOptions = {
    uri: query,
    headers: { "x-api-key": API_KEY },
    formData: {
        name: path.basename(DestinationFile),
        password: Password,
        pages: Pages,
        simple: PlainHtml,
        columns: ColumnLayout,
        file: fs.createReadStream(SourceFile)
    }
};

request.post(reqOptions, function (error, response, body) {
    if (error) {
        return console.error("Error: ", error);
    }

    let data = JSON.parse(body);
    if (data.error == false) {
        // Download HTML file
        var file = fs.createWriteStream(DestinationFile);
        https.get(data.url, (response2) => {
            response2.pipe(file)
            .on("close", () => {
                console.log(`Generated HTML file saved as "${DestinationFile}" file.`);
            });
        });
    }
    else {
        // Service reported error
        console.log("Error: " + data.message);
    }
});
}

module.exports = PDFtoHTML