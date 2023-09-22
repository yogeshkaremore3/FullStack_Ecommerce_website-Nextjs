  const cheaksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body),process.env.NEXT_PUBLIC_PAYTM_MKEY)
    
        paytmParams.head = {
            "signature"    : checksum
        };
    
        var post_data = JSON.stringify(paytmParams);

        const requestAsync=()=>{

            return new Promise((resolve,reject)=>{

                var options = {
    
                    /* for Staging */
                    // hostname: 'securegw-stage.paytm.in',
            
                    /* for Production */
                    hostname: 'securegw.paytm.in',
            
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.orderId}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };
            
                var response = "";
                var post_req = https.request(options, function(post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });
            
                    post_res.on('end', function(){
                        console.log('Response: ', response);
                        resolve(JSON.parse(response).body)

                        console.log(response)
                    });
                });
            
                post_req.write(post_data);
                post_req.end(); 


            })
        }
    
        let myr = await requestAsync()