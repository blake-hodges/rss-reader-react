export function parseTynanXML(data) {
    let entries = data.querySelectorAll("item");
    let containerArray = [];
    for (let i = 0; i < entries.length; i++) {
        let tynanData = {};
        //get title and blog info
        tynanData["title"] = entries[i].querySelector("title").innerHTML;
        tynanData["site"] = "Tynan | tynan.com";
        //get content of blog entry
        //parse data for blog content
        let entryContentText = entries[i].getElementsByTagName("content:encoded").item(0).innerHTML;
        let domParser = new DOMParser();
        let parsedHTML = domParser.parseFromString(entryContentText, "text/html");
        let firstP = parsedHTML.querySelector("p:nth-child(3)").innerText;
        let firstPFormatted = firstP.substring(0, firstP.length - 1);
        tynanData["content"] = firstPFormatted + "...";
        //get date info
        let dateString = entries[i].querySelector("pubDate").innerHTML;
        let dateObj = new Date(dateString);
        tynanData["date"] = dateObj.toDateString();
        //get utc from date object
        tynanData["utc"] = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        //get url of blog article
        tynanData["url"] = entries[i].querySelector("link").innerHTML;
        //push object to container array
        containerArray.push(tynanData);
    }
    return containerArray;
}

export function parseSiversXML(data) {
    let entries = data.querySelectorAll("entry");
    let containerArray = [];
    for (let i = 0;i < 10; i++) {
        //create nested object for each blog entry
        let siversData = {};
        //get title and blog info
        siversData["title"] = entries[i].querySelector("title").innerHTML;
        siversData["site"] = "Derek Sivers | sivers.org";
        //get content of blog entry
        //parse data for blog content with a regular expression to remove html tags
        let content = entries[i].querySelector("content").innerHTML;
        let domParser = new DOMParser();
        let parsedHTML = domParser.parseFromString(content, "text/html");
        let x = parsedHTML.querySelector("body").innerHTML;
        let y = x.match(/&lt;p&gt;[\s\S]+?&lt;\/p&gt;/);
        let strOne = y[0];
        let strTwo = strOne.replace(/&lt;.+?&gt;/g, "");
        siversData["content"] = strTwo;
        //get date info
        let dateString = entries[i].querySelector("updated").innerHTML;
        let dateObj = new Date(dateString);
        siversData["date"] = dateObj.toDateString();
        //get utc from date object
        siversData["utc"] = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        //get url of blog article
        siversData["url"] = entries[i].querySelector("link").getAttribute("href");
        //push object to container array
        containerArray.push(siversData);
    }
    return containerArray
}

export function parseZakasXML(data) {
    let entries = data.querySelectorAll("item");
    let containerArray = [];
    for (let i = 0; i < entries.length; i++) {
        //create nested object for each blog entry
        let zakasData = {};
        //get title and blog info
        zakasData["title"] = entries[i].querySelector("title").innerHTML;
        zakasData["site"] = "Nicholas C. Zakas | humanwhocodes.com";
        //get content of blog entry
        let entryContentText = entries[i].getElementsByTagName("description").item(0).innerHTML;
        zakasData["content"] = entryContentText;
        //get date info
        let dateString = entries[i].querySelector("pubDate").innerHTML;
        let dateObj = new Date(dateString);
        zakasData["date"] = dateObj.toDateString();
        //get utc from date object
        zakasData["utc"] = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        //get url of blog article
        zakasData["url"] = entries[i].querySelector("link").innerHTML;
        //push object to container array
        containerArray.push(zakasData);
    }
    return containerArray;
}
