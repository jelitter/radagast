<!DOCTYPE html>
<html>
<head>
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