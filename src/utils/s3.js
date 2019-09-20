import AWS from 'aws-sdk'

const {
  REACT_APP_COGNITO_IDENTITY_POOL_ID,
  REACT_APP_BUCKET,
  REACT_APP_CYCLE_DATA_OBJECT,
  REACT_APP_COGNITO_AWS_REGION,
} = process.env

AWS.config.region = REACT_APP_COGNITO_AWS_REGION
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: REACT_APP_COGNITO_IDENTITY_POOL_ID,
})
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: REACT_APP_BUCKET },
})

export const getObject = key => {
  const bucketParams = {
    Key: key,
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

export const getLatestDateFileName = prefix => {
  const bucketParams = {
    Prefix: REACT_APP_DATE_DIRECTORY,
  }
  return s3
    .listObjects(bucketParams)
    .promise()
    .then(response => {
      const objectList = JSON.parse(response.Body.toString())['Contents']
      return `${REACT_APP_DATE_DIRECTORY}/${objectList.length - 1}.json`
    })
    .catch(err => {
      console.log(err, err.stack)
      return null
    })
}
