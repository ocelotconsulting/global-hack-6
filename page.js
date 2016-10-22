const title = 'Ocelot Global Hack VI'
const googleMapsApiKey = 'AIzaSyAxVaHXZxWdgkByrq8ALNmH8PJBVSzhwXc'

module.exports = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name = "viewport" content = "initial-scale = 1.0, user-scalable = no">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <title>${title}</title>
  <link href="/favicon.ico" rel="shortcut icon">
  <link rel="stylesheet" type="text/css" href="/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="/chartist/dist/chartist.min.css">
  <link rel="stylesheet" type="text/css" href="/styles.css">
  <link rel="apple-touch-icon" href="/logo.png">
</head>
<body>
  <div id="main"></div>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}" charset="utf-8"></script>
    <script type="text/javascript" src="/bundle.js" charset="utf-8"></script>
</body>
</html>
`
