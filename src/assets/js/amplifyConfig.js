const CognitoRegion = 'ap-northeast-2';
const CognitoUserPool = 'ap-northeast-2_p5HpK6s6k';
const CognitoUserPoolClient = '7vtob3c7drttlqci74st2npf3g';
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
