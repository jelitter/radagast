<!DOCTYPE html>
<html>
<head>
  <style type="text/css">
    body { 
      position: absolute;
      top: 50px;
      width: 100%; 
      margin: 0px;
      padding: 0px;

      background-image: url("/favicon.png");
      background-size: 300px;

      background-repeat: no-repeat;
      background-position: 200px 75px; 
      background-attachment: fixed;
      /*background-color: #cccccc;*/

    }

    * { 
      border: 0px;
      padding: 0px;
      font-family: Helvetica; 
      vertical-align: center;
    }


    div {
      width: 100%;
      margin: 0px;
    }

    h1 { 
      background: #ADF;
      background: linear-gradient(#CFF, #ADF , #CFF);
      border-radius: 4px;
      box-shadow: 2px 2px 6px #88AAFF;
      height: 50px;
      line-height: 50px;
      margin-bottom: 20px;
      margin-left: 20px;
      margin-top: 100px;
      margin: 0px 10px;  
      padding-left: 10px;
      width: 90%;
      /*vertical-align: center;*/
    }

    h1:hover {
      background: linear-gradient(#DFF, #BEF , #DFF);
      box-shadow: 0px 0px 8px #AACCFF;
    }

    h2 {
      margin-top: 40px;
      margin-left: 20px;
      margin-bottom: 0px;
      text-shadow: 0px 0px 16px #ADF;
    }

    h3 {
      background: #DDD;
      background: -webkit-linear-gradient(left, #DDD , #EEE); /* For Safari 5.1 to 6.0 */
      background: -o-linear-gradient(right, #DDD, #EEE); /* For Opera 11.1 to 12.0 */
      background: -moz-linear-gradient(right, #DDD, #EEE); /* For Firefox 3.6 to 15 */
      background: linear-gradient(to right, #DDD , #EEE); /* Standard syntax */
      margin-left: -10px;
      font-family: Courier;
      padding: 5px 10px;
      border-radius: 4px 4px 0px 0px;
    }

    p {
      margin: 10px 0px;
    }

    #ep:hover {
      box-shadow: 0px 0px 4px #888888;
    }

    #exbox {
      width: calc(100% - 20px);
      align-content: center;
      background: #F6F6F6;
      margin-top: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      margin-left: 0px;
      border-radius: 4px;
    }

    #example {
      font-family: courier;
    }
  </style>
</head>
<body>

  <h1>RADAGAST - API Documentation</h1>
  <h2>Twitter</h2>
  <div id="ep">
    <h3>/api/v1/twitter/search</h3>
    <h4>Search tweets about a topic, optionally selecting a count and a language.</h4>
    <p>Params:</p>
    <li>q:     Search string     (Mandatory)</li>
    <li>lang:  Language          (Optional, default: en)</li>
    <li>count: number of tweets  (Optional, default: 1)</li>
    <div id="exbox">
      <p>Examples:</p>
      <p id="example">/api/v1/twitter/search/?q=pizza</p>
      <p id="example">/api/v1/twitter/search/?q=tour&lang=fr</p>
      <p id="example">/api/v1/twitter/search/?q=cork&count=10</p>
    </div>
  </div>

  <div id="ep">
    <h3>/api/v1/twitter/remove</h3>
    <h4>Remove saved results from previous searches for a topic.</h4>
    <p>Params:</p>
    <li>q:     Search string     (Mandatory)</li>
    <div id="exbox">
      <p>Examples:</p>
      <p id="example">/api/v1/twitter/remove/?q=broccoli</p>
    </div>
  </div>

  <div id="ep">
    <h3>/api/v1/twitter/all</h3>
    <h4>Shows all saved results from previous searches.</h4>
    <p>No params. required</p>
  </div>

  <h2>Favourites</h2>

  <div id="ep">
    <h3>/api/v1/favourites/add</h3>
    <h4>Add a search topic to an user's favourite list.</h4>
    <p>Params:</p>
    <li>user:  user name     (Mandatory)</li>
    <li>text:  search topic  (Mandatory)</li>
    <div id="exbox">
      <p>Examples:</p>
      <p id="example">/api/v1/favourites/add/?user=isaac&text=coding</p>
    </div>
  </div>
  <div id="ep">
    <h3>/api/v1/favourites/remove</h3>
    <h4>Remove a search topic to an user's favourite list.</h4>
    <p>Params:</p>
    <li>user:  user name     (Mandatory)</li>
    <li>text:  search topic  (Mandatory)</li>
    <div id="exbox">
      <p>Examples:</p>
      <p id="example">/api/v1/favourites/remove/?user=isaac&text=sports</p>
    </div>
  </div>
  <div id="ep">
    <h3>/api/v1/favourites/get</h3>
    <h4>Show an user's favourite list.</h4>
    <p>Params:</p>
    <li>user:  user name     (Mandatory)</li>
    <div id="exbox">
      <p>Examples:</p>
      <p id="example">/api/v1/favourites/get/?user=manuel</p>
    </div>
  </div>

</body>
</html>