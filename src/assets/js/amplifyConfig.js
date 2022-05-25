const CognitoRegion = 'ap-northeast-2';
const CognitoUserPool = 'ap-northeast-2_xxxxxxxx';
const CognitoUserPoolClient = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';
const CognitoDomainPrefix = 'toyseven-domain';

const AmplifyConfig = {
    Auth: {
        region: CognitoRegion,
        userPoolId: CognitoUserPool,
        userPoolWebClientId : CognitoUserPoolClient,
        oauth: {
            domain: `${CognitoDomainPrefix}.auth.${CognitoRegion}.amazoncognito.com`,
            // scope: ['openid'],
            redirectSignIn: `http://localhost:3000`,
            redirectSignOut: `http://localhost:3000`,
            responseType: `code`
        }
    }

};

export default AmplifyConfig;
