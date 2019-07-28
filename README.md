# SearchApp

## Local production steps
Run `npm run start` or `npm run dev` (development environment) and it should run on localhost:3000.

---

## Setting up authentication
You will need your service account key in order to access Google BigQuery API.
Please click [here](https://cloud.google.com/bigquery/docs/reference/libraries) for Google Cloud's official documentation on how to do so.

Once you have obtained your service account key, which is essentially a json file, open the `package.json` file and rename `My-Service-Account-Key.json` to your file's name. Depending on where you store your account key file, you may edit the file path accordingly.
