import request from 'request';
import users_service from './users_service';

function do_google_auth(token: string){
    return new Promise((resolve, reject) => {
        request('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token, function (error, response, body) {
            if(!!error){
                reject(error);
                return;
            }
            if(response.statusCode < 200 || response.statusCode > 299){
                reject({err: "Failed to get user identity"});
                return;
            }

            body = JSON.parse(body);

            let google_id = body.id;
            users_service.get_user_by_google_id(google_id)
            .then(user => {
                if(!!user){
                    resolve(user)
                }else{
                    users_service.create_new_user(body['given_name'], body['family_name'], google_id)
                    .then(_ => {
                        users_service.get_user_by_google_id(google_id)
                        .then(resolve);
                    })
                }
            });
      });
       
    });
}

export default{
    do_google_auth
}