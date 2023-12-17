###### TESTED ON NODE JS VERSION 16.17.0

# HOW TO RUN

#### 1. Clone Project `git clone https://github.com/Deswiji/absence-authentication.git`

#### 2. Checkout ke branch `Master`

#### 3. Import database dengan file `test_uninet.sql`

#### 4. Install dependencies `npm install`

#### 5. Load environment `source .env` dan run server `npm start`

#### 6. Server berhasil dirunning

# ENDPOINT

#### 1. Untuk register `/auth/register`

##### body yang dikirimkan berbentuk `JSON (email dan password)`

#### 2. Untuk login `/auth/login`

##### body yang dikirimkan berbentuk `JSON (email dan password)`

#### 3. Untuk absensi `/absence`

##### Header yang dikirimkan adalah `Authorization` dan `x-access-token`

##### Token didapatkan saat endpoint login dipanggil

### NOTED

##### Semua endpoint wajib mengirimkan header `Authorization` dengan value `SGFueWEgTWFudXNpYSBCaWFzYSBZYW5nIEJlcnVzYWhhIE1lcmFpaCBNaW1waQ==`
