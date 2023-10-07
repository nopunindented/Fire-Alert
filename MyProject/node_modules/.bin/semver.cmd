@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@react-native-community\cli-doctor\node_modules\semver\bin\semver.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@react-native-community\cli-doctor\node_modules\semver\bin\semver.js" %*
)