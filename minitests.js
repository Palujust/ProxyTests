//5 tests of 5 tasks each
var minitests = [{"id":0,"tasks":[{"duration":4191,"biller_number":2,"biller":"Biller B"},{"duration":7065,"biller_number":2,"biller":"Biller B"},{"duration":4691,"biller_number":3,"biller":"Biller C"},{"duration":8059,"biller_number":3,"biller":"Biller C"},{"duration":5865,"biller_number":3,"biller":"Biller C"}]},{"id":1,"tasks":[{"duration":6577,"biller_number":4,"biller":"Biller D"},{"duration":2872,"biller_number":3,"biller":"Biller C"},{"duration":2031,"biller_number":3,"biller":"Biller C"},{"duration":1816,"biller_number":2,"biller":"Biller B"},{"duration":1957,"biller_number":2,"biller":"Biller B"}]},{"id":2,"tasks":[{"duration":6071,"biller_number":1,"biller":"Biller A"},{"duration":8146,"biller_number":3,"biller":"Biller C"},{"duration":5260,"biller_number":4,"biller":"Biller D"},{"duration":2502,"biller_number":3,"biller":"Biller C"},{"duration":4281,"biller_number":4,"biller":"Biller D"}]},{"id":3,"tasks":[{"duration":8947,"biller_number":2,"biller":"Biller B"},{"duration":8018,"biller_number":4,"biller":"Biller D"},{"duration":8904,"biller_number":3,"biller":"Biller C"},{"duration":9105,"biller_number":1,"biller":"Biller A"},{"duration":8418,"biller_number":3,"biller":"Biller C"}]},{"id":4,"tasks":[{"duration":9716,"biller_number":4,"biller":"Biller D"},{"duration":6263,"biller_number":3,"biller":"Biller C"},{"duration":3918,"biller_number":4,"biller":"Biller D"},{"duration":8802,"biller_number":4,"biller":"Biller D"},{"duration":3811,"biller_number":1,"biller":"Biller A"}]}]
//2 tests with 100 tasks each
var minitests2 = [{"id":0,"tasks":[{"duration":4373,"biller_number":3,"biller":"Biller C"},{"duration":5525,"biller_number":1,"biller":"Biller A"},{"duration":8417,"biller_number":4,"biller":"Biller D"},{"duration":7269,"biller_number":3,"biller":"Biller C"},{"duration":7289,"biller_number":1,"biller":"Biller A"},{"duration":7312,"biller_number":4,"biller":"Biller D"},{"duration":8459,"biller_number":4,"biller":"Biller D"},{"duration":9916,"biller_number":5,"biller":"Biller E"},{"duration":3585,"biller_number":2,"biller":"Biller B"},{"duration":2189,"biller_number":5,"biller":"Biller E"},{"duration":9759,"biller_number":4,"biller":"Biller D"},{"duration":4203,"biller_number":1,"biller":"Biller A"},{"duration":7166,"biller_number":1,"biller":"Biller A"},{"duration":6548,"biller_number":1,"biller":"Biller A"},{"duration":7017,"biller_number":3,"biller":"Biller C"},{"duration":7247,"biller_number":2,"biller":"Biller B"},{"duration":9452,"biller_number":5,"biller":"Biller E"},{"duration":2494,"biller_number":3,"biller":"Biller C"},{"duration":6173,"biller_number":1,"biller":"Biller A"},{"duration":4159,"biller_number":3,"biller":"Biller C"},{"duration":3105,"biller_number":5,"biller":"Biller E"},{"duration":8145,"biller_number":1,"biller":"Biller A"},{"duration":9839,"biller_number":3,"biller":"Biller C"},{"duration":6809,"biller_number":2,"biller":"Biller B"},{"duration":1798,"biller_number":4,"biller":"Biller D"},{"duration":6418,"biller_number":5,"biller":"Biller E"},{"duration":2380,"biller_number":3,"biller":"Biller C"},{"duration":5771,"biller_number":5,"biller":"Biller E"},{"duration":1480,"biller_number":1,"biller":"Biller A"},{"duration":2940,"biller_number":5,"biller":"Biller E"},{"duration":3659,"biller_number":5,"biller":"Biller E"},{"duration":8572,"biller_number":5,"biller":"Biller E"},{"duration":8896,"biller_number":2,"biller":"Biller B"},{"duration":2315,"biller_number":2,"biller":"Biller B"},{"duration":4506,"biller_number":1,"biller":"Biller A"},{"duration":4520,"biller_number":4,"biller":"Biller D"},{"duration":3803,"biller_number":3,"biller":"Biller C"},{"duration":2937,"biller_number":4,"biller":"Biller D"},{"duration":4596,"biller_number":5,"biller":"Biller E"},{"duration":4103,"biller_number":5,"biller":"Biller E"},{"duration":2323,"biller_number":2,"biller":"Biller B"},{"duration":7711,"biller_number":2,"biller":"Biller B"},{"duration":6790,"biller_number":2,"biller":"Biller B"},{"duration":5439,"biller_number":4,"biller":"Biller D"},{"duration":8659,"biller_number":4,"biller":"Biller D"},{"duration":9079,"biller_number":3,"biller":"Biller C"},{"duration":2670,"biller_number":1,"biller":"Biller A"},{"duration":1808,"biller_number":5,"biller":"Biller E"},{"duration":6418,"biller_number":1,"biller":"Biller A"},{"duration":3415,"biller_number":2,"biller":"Biller B"},{"duration":3473,"biller_number":1,"biller":"Biller A"},{"duration":2487,"biller_number":2,"biller":"Biller B"},{"duration":2502,"biller_number":2,"biller":"Biller B"},{"duration":3193,"biller_number":4,"biller":"Biller D"},{"duration":1784,"biller_number":5,"biller":"Biller E"},{"duration":9613,"biller_number":4,"biller":"Biller D"},{"duration":6278,"biller_number":5,"biller":"Biller E"},{"duration":1346,"biller_number":3,"biller":"Biller C"},{"duration":7117,"biller_number":3,"biller":"Biller C"},{"duration":3659,"biller_number":5,"biller":"Biller E"},{"duration":5112,"biller_number":3,"biller":"Biller C"},{"duration":8623,"biller_number":1,"biller":"Biller A"},{"duration":1472,"biller_number":1,"biller":"Biller A"},{"duration":2863,"biller_number":2,"biller":"Biller B"},{"duration":5270,"biller_number":2,"biller":"Biller B"},{"duration":2838,"biller_number":5,"biller":"Biller E"},{"duration":8431,"biller_number":3,"biller":"Biller C"},{"duration":6596,"biller_number":3,"biller":"Biller C"},{"duration":1951,"biller_number":5,"biller":"Biller E"},{"duration":3277,"biller_number":1,"biller":"Biller A"},{"duration":8038,"biller_number":4,"biller":"Biller D"},{"duration":2160,"biller_number":1,"biller":"Biller A"},{"duration":4292,"biller_number":5,"biller":"Biller E"},{"duration":8559,"biller_number":5,"biller":"Biller E"},{"duration":1849,"biller_number":1,"biller":"Biller A"},{"duration":5764,"biller_number":5,"biller":"Biller E"},{"duration":7540,"biller_number":4,"biller":"Biller D"},{"duration":1527,"biller_number":3,"biller":"Biller C"},{"duration":7542,"biller_number":3,"biller":"Biller C"},{"duration":3732,"biller_number":2,"biller":"Biller B"},{"duration":1058,"biller_number":3,"biller":"Biller C"},{"duration":4713,"biller_number":5,"biller":"Biller E"},{"duration":2105,"biller_number":5,"biller":"Biller E"},{"duration":1854,"biller_number":4,"biller":"Biller D"},{"duration":7722,"biller_number":1,"biller":"Biller A"},{"duration":7295,"biller_number":1,"biller":"Biller A"},{"duration":1924,"biller_number":1,"biller":"Biller A"},{"duration":8987,"biller_number":1,"biller":"Biller A"},{"duration":8598,"biller_number":4,"biller":"Biller D"},{"duration":5357,"biller_number":5,"biller":"Biller E"},{"duration":5705,"biller_number":5,"biller":"Biller E"},{"duration":3283,"biller_number":2,"biller":"Biller B"},{"duration":4492,"biller_number":4,"biller":"Biller D"},{"duration":5268,"biller_number":2,"biller":"Biller B"},{"duration":7795,"biller_number":5,"biller":"Biller E"},{"duration":2844,"biller_number":3,"biller":"Biller C"},{"duration":6111,"biller_number":3,"biller":"Biller C"},{"duration":1589,"biller_number":2,"biller":"Biller B"},{"duration":7441,"biller_number":3,"biller":"Biller C"},{"duration":8067,"biller_number":4,"biller":"Biller D"}]},{"id":1,"tasks":[{"duration":7656,"biller_number":4,"biller":"Biller D"},{"duration":3551,"biller_number":3,"biller":"Biller C"},{"duration":1515,"biller_number":1,"biller":"Biller A"},{"duration":4568,"biller_number":1,"biller":"Biller A"},{"duration":6499,"biller_number":3,"biller":"Biller C"},{"duration":2638,"biller_number":4,"biller":"Biller D"},{"duration":1392,"biller_number":2,"biller":"Biller B"},{"duration":2964,"biller_number":2,"biller":"Biller B"},{"duration":8235,"biller_number":5,"biller":"Biller E"},{"duration":8010,"biller_number":5,"biller":"Biller E"},{"duration":8546,"biller_number":1,"biller":"Biller A"},{"duration":8898,"biller_number":3,"biller":"Biller C"},{"duration":7625,"biller_number":1,"biller":"Biller A"},{"duration":5966,"biller_number":3,"biller":"Biller C"},{"duration":4165,"biller_number":5,"biller":"Biller E"},{"duration":9234,"biller_number":1,"biller":"Biller A"},{"duration":5832,"biller_number":5,"biller":"Biller E"},{"duration":8892,"biller_number":4,"biller":"Biller D"},{"duration":9188,"biller_number":4,"biller":"Biller D"},{"duration":3365,"biller_number":5,"biller":"Biller E"},{"duration":9570,"biller_number":2,"biller":"Biller B"},{"duration":1508,"biller_number":5,"biller":"Biller E"},{"duration":8793,"biller_number":4,"biller":"Biller D"},{"duration":1110,"biller_number":3,"biller":"Biller C"},{"duration":4680,"biller_number":1,"biller":"Biller A"},{"duration":6313,"biller_number":3,"biller":"Biller C"},{"duration":6281,"biller_number":1,"biller":"Biller A"},{"duration":9364,"biller_number":5,"biller":"Biller E"},{"duration":7964,"biller_number":3,"biller":"Biller C"},{"duration":1048,"biller_number":2,"biller":"Biller B"},{"duration":5790,"biller_number":3,"biller":"Biller C"},{"duration":8670,"biller_number":5,"biller":"Biller E"},{"duration":3789,"biller_number":5,"biller":"Biller E"},{"duration":8435,"biller_number":1,"biller":"Biller A"},{"duration":2069,"biller_number":2,"biller":"Biller B"},{"duration":9239,"biller_number":1,"biller":"Biller A"},{"duration":6702,"biller_number":1,"biller":"Biller A"},{"duration":4624,"biller_number":4,"biller":"Biller D"},{"duration":1600,"biller_number":1,"biller":"Biller A"},{"duration":7856,"biller_number":1,"biller":"Biller A"},{"duration":4544,"biller_number":3,"biller":"Biller C"},{"duration":1852,"biller_number":4,"biller":"Biller D"},{"duration":4082,"biller_number":3,"biller":"Biller C"},{"duration":7520,"biller_number":5,"biller":"Biller E"},{"duration":7230,"biller_number":2,"biller":"Biller B"},{"duration":2021,"biller_number":3,"biller":"Biller C"},{"duration":6119,"biller_number":5,"biller":"Biller E"},{"duration":5228,"biller_number":4,"biller":"Biller D"},{"duration":9254,"biller_number":2,"biller":"Biller B"},{"duration":4947,"biller_number":5,"biller":"Biller E"},{"duration":9195,"biller_number":2,"biller":"Biller B"},{"duration":1278,"biller_number":3,"biller":"Biller C"},{"duration":1361,"biller_number":1,"biller":"Biller A"},{"duration":2496,"biller_number":3,"biller":"Biller C"},{"duration":6554,"biller_number":1,"biller":"Biller A"},{"duration":2728,"biller_number":1,"biller":"Biller A"},{"duration":9546,"biller_number":2,"biller":"Biller B"},{"duration":8245,"biller_number":5,"biller":"Biller E"},{"duration":4723,"biller_number":2,"biller":"Biller B"},{"duration":5692,"biller_number":1,"biller":"Biller A"},{"duration":3159,"biller_number":2,"biller":"Biller B"},{"duration":6722,"biller_number":3,"biller":"Biller C"},{"duration":4616,"biller_number":3,"biller":"Biller C"},{"duration":9063,"biller_number":3,"biller":"Biller C"},{"duration":2340,"biller_number":4,"biller":"Biller D"},{"duration":5948,"biller_number":1,"biller":"Biller A"},{"duration":9936,"biller_number":2,"biller":"Biller B"},{"duration":8618,"biller_number":2,"biller":"Biller B"},{"duration":5813,"biller_number":2,"biller":"Biller B"},{"duration":9535,"biller_number":2,"biller":"Biller B"},{"duration":8406,"biller_number":3,"biller":"Biller C"},{"duration":8651,"biller_number":2,"biller":"Biller B"},{"duration":3983,"biller_number":4,"biller":"Biller D"},{"duration":4989,"biller_number":4,"biller":"Biller D"},{"duration":5086,"biller_number":2,"biller":"Biller B"},{"duration":7805,"biller_number":1,"biller":"Biller A"},{"duration":8643,"biller_number":4,"biller":"Biller D"},{"duration":5520,"biller_number":1,"biller":"Biller A"},{"duration":2034,"biller_number":1,"biller":"Biller A"},{"duration":2353,"biller_number":1,"biller":"Biller A"},{"duration":4091,"biller_number":3,"biller":"Biller C"},{"duration":8730,"biller_number":1,"biller":"Biller A"},{"duration":9585,"biller_number":2,"biller":"Biller B"},{"duration":1760,"biller_number":5,"biller":"Biller E"},{"duration":7396,"biller_number":5,"biller":"Biller E"},{"duration":8921,"biller_number":2,"biller":"Biller B"},{"duration":5441,"biller_number":3,"biller":"Biller C"},{"duration":7148,"biller_number":4,"biller":"Biller D"},{"duration":6840,"biller_number":3,"biller":"Biller C"},{"duration":3975,"biller_number":2,"biller":"Biller B"},{"duration":3077,"biller_number":4,"biller":"Biller D"},{"duration":9049,"biller_number":4,"biller":"Biller D"},{"duration":9343,"biller_number":2,"biller":"Biller B"},{"duration":9655,"biller_number":2,"biller":"Biller B"},{"duration":5255,"biller_number":1,"biller":"Biller A"},{"duration":9948,"biller_number":4,"biller":"Biller D"},{"duration":8547,"biller_number":4,"biller":"Biller D"},{"duration":3635,"biller_number":5,"biller":"Biller E"},{"duration":9201,"biller_number":4,"biller":"Biller D"},{"duration":1067,"biller_number":5,"biller":"Biller E"}]}]