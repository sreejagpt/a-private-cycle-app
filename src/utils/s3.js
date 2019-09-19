import AWS from 'aws-sdk'

const getCycleData = () => {
    const {
        REACT_APP_COGNITO_IDENTITY_POOL_ID,
        REACT_APP_BUCKET,
        REACT_APP_CYCLE_DATA_OBJECT,
        REACT_APP_COGNITO_AWS_REGION,
    } = process.env
    console.log(process.env)
    AWS.config.region = REACT_APP_COGNITO_AWS_REGION
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: REACT_APP_COGNITO_IDENTITY_POOL_ID,
    })
    const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: REACT_APP_BUCKET },
    })
    const bucketParams = {
        Key: REACT_APP_CYCLE_DATA_OBJECT,
    }
    return s3
        .getObject(bucketParams)
        .promise()
        .then(response => {
            return JSON.parse(response.Body.toString())
        })
        .catch(err => {
            console.log(err, err.stack)
            return null
        })
}

export default getCycleData
