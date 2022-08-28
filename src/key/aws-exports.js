import AWS from 'aws-sdk'
import s3Keys from './s3.js'

AWS.config.update(s3Keys);
const s3 = new AWS.S3();

const paramsImages = { 
 Bucket: 'helmet-detection-data',
 Delimiter: '/',
 Prefix: 'images/'
}

const paramsVideos = { 
    Bucket: 'helmet-detection-data',
    Delimiter: '/',
    Prefix: 'videos/'
}

const fetchDataS3 = async (param) => {
    const params = param === 'images' ? paramsImages : paramsVideos
    const data = await s3.listObjects(params).promise();
    // console.log(data)
    return data
}

const listObjectsBucket = async (param) => {
    const data = [];
    const response = await fetchDataS3(param)
    response.Contents.forEach(item => {
        const id = (item.Key).replace(param + '/', "")
        const date = (item.LastModified / 1000)
        data.push({id, date})
    });

    data.sort((a, b) => {
        return a.date - b.date;
    });

    return data
}

export default listObjectsBucket;

