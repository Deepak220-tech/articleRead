const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const logger = require('./looger');

const wiki_result = async()=>{
  try {
        const articles = ['https://en.wikipedia.org/wiki/Python_(programming_language)','https://en.wikipedia.org/wiki/Concurrency_(computer_science)','https://en.wikipedia.org/wiki/Artificial_intelligence','https://en.wikipedia.org/wiki/Artificial_intelligence',
            'https://en.wikipedia.org/wiki/Relational_database','https://en.wikipedia.org/wiki/NoSQL','https://en.wikipedia.org/wiki/Redis','https://en.wikipedia.org/wiki/Elasticsearch','https://en.wikipedia.org/wiki/Java_(programming_language)','https://en.wikipedia.org/wiki/C_(programming_language)'];
        
        for(url of articles){
        // Download the file
            const fileUrl = url;
            const response = await axios.get(fileUrl);
            const htmlContent = response.data;
            logger.info(`result :Article Downloaded Successfully ${fileUrl},TimeStamp: ${new Date()}`);
            const $ = cheerio.load(htmlContent);
            const textContent = $.text();
            if (textContent.length === 0){
                logger.info(`result :Article is empty,TimeStamp: ${new Date()}`);
                console.log("Article is Empty")
            }
            const words = textContent.split(/\s+/).filter(word => word.length > 0);
            const wordCount = words.length;
            const output = `${fileUrl}: ${wordCount}\n`;
            const filePath = 'results.txt'
            // Write data to the file
            fs.appendFileSync(filePath, output, (err) => {
                if (err) {
                    logger.error(`result : ${err},TimeStamp: ${new Date()}`);
                    console.error('Error writing to file:', err);
                } else {
                    logger.info(`result : ${output},TimeStamp: ${new Date()}`);
                    console.log('File has been saved successfully!');
                }
            });

            logger.info(`result : ${output},TimeStamp: ${new Date()}`);
            console.log(`${fileUrl}: ${wordCount}`);
        }   
    } catch (error) {
        logger.error(`result : ${error},TimeStamp: ${new Date()}`);
        console.error('Error downloading or processing the file:', error);
    }

}
module.exports = wiki_result;