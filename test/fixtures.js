module.exports = {
  "session": {
    "response": {
      "accountNumber": "user",
      "deviceId": "12345",
      "appUserId": "12345",
      "consumerRef": "Force",
      "docuSure": true,
      "veriSure": true,
      "instaSure": true,
      "identiSure": true,
      "documentationUrl": "https://api.paycasso.com",
      "biometricsUrl": "https://api.paycasso.com",
      "notificationUrl": "https://paycasso.com",
      "sessionToken": "FjsCxh1VyAyEhBjdcY+3QS2SRmpc5+l+Yb8SpGcSoyo=",
      "timestamp": "2013-07-30T14:09:23.572Z",
      "matchThreshold": 0.85,
      "notificationEmail": "rbs@rbs.com"
    }
  },
  "authorisedlogin": {
    "response": {
      "token": "768b40a8-6c8f-4d93-9d2f-d77d06037b5d", // this token is used in the header of all subsequent requests
      "clientId": "sa",
      "userId": "sa",
      "configuration": {
        "paycassoChecksDetails": {
          "faceCaptureTimeouts": {
            "onceFaceDetected":8,
            "framesSubmission":30,
            "noFaceDetected":30,
            "skippingFaceDetection":10
          }
        },
        "paycassoAdditionalChecksDetails": {
          "isGeoLocationRequired":false
        },
        "deviceCheckConfig": {
          "orientation": {
            "sideTolerance":0.1,
            "frontTolerance":0.1
          }
        },
        "deviceConfig": {
          "offlineSupport":true,
          "enableCameraOnDevice": "BothCameras"
        },
        "dictionaryLastUpdated": [
          {
            "locale":"en",
            "title":"English",
            "lastUpdated":"2015-12-23T21:00:00.000+0000"
          },
          {
            "locale":"de",
            "title":"Deutsch",
            "lastUpdated":"2015-12-24T14:30:00.000+0000"
          }
        ]
      },
      "managementUrl": "https://<servername>.paycasso.com", // this is the address of the web-portal
      "staticUrl": "https://<servername>.paycasso.com", // this is the URL for all subsequent requests in this session
      "streamUrl": "https://<servername>.paycasso.com",
      "permissions": ["conduct_docusure", "conduct_verisure", "conduct_instasure"]
    }
  },
  "transactions": {
    "request": {
      "consumerReference": "someCref",
      "transactionCheck": "VeriSure",
      "transactionReference": "someTref",
      "documentsConfiguration": {
        "documents": [
          {
            "acceptedDocuments": {
              "kind": "any"
            },
            "bothSides": false,
            "docCheck": {
              "kind": "all"
            },
            "face": {
              "kind": "all"
            },
            "ocr": {
              "kind": "all"
            },
            "preflight":{
              "kind":"no"
            },
            "preprocess": {
                "kind": "no"
            }
          },
          {
            "acceptedDocuments": {
              "kind": "listed",
              "classifiers": [
                {
                  "document": "DrivingLicense",
                  "countryCode": "GBR",
                  "description": "UK Provisional Licence",
                  "acceptance": "yes"
                }
              ]
            },
            "bothSides": false,
            "docCheck": {
              "kind": "all"
            },
            "face": {
              "kind": "all"
            },
            "ocr": {
              "kind": "all"
            },
            "preflight": {
              "kind": "no"
            }
          }
        ]
      },
      "signatureStepRequired": false
    },
    "response": {
      "transactionId": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6"
    }
  },
  "document/data/usdl": {
    "request": {
      "fullName": "John Doe", //optional
      "lastName": "Doe", //optional
      "firstName": "John", //optional
      "middleName": "John", //optional
      "dateOfBirth": "1981-12-25",
      "country": "US",
      "licenseNumber": "0000001",
      "dateOfIssue": "1992-02-27", //optional
      "dateOfExpiration": "2022-02-27", //optional
      "address": "6834 Hollywood Blvd", //optional
      "city": "Hollywood", //optional
      "state": "CA", //optional
      "postCode": "90028-6102", //optional
      "gender": "Male",
      "height": "5'4", //optional
      "eyes": "blue", //optional
      "identityNumber" : "8003255092088", //optional
      "securityNumber": "18283", //optional
      "status": "CITIZEN", //optional
      "nationality": "US" //optional
    },
    "response": {
      "transactionId": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
      "message": "Document data processed"
    }
  },
  "document/data/epassport": {
    "request": {
      "issuingOrganization": "FL",
      "nameOfHolder": "Maksym",
      "documentNumber": "BR083796",
      "nationality": "US",
      "dateOfBirth": "1983-12-22",
      "gender": "Male",
      "dateOfExpiration": "2020-12-22",
      "optionalData": "Additional Information",
      "nfcVerificationKey": 1
    },
    "response": {
      "transactionId": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
      "message": "Document data processed"
    }
  },
  "document/data/epassport/face": {
    "request": {
      "image": "<image in base64 format>"
    },
    "response": {
      "transactionId": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
      "message": "Document data processed"
    }
  },
  "document": {
    "request": {
      "image": "<image in base64 format>"
    },
    "response": {
      "preflight":{
        "histogram": {
          "tooDark": false,
          "tooLight": false,
          "tooSaturated": false,
          "tooUnsaturated": false
        },
        "focus": {
          "notInFocus": false
        }
      },
      "preflightSucceeded": true
    }
  },
  "face": {
    "request": {
      "image": "<image in base64 format>"
    },
    "response": {
      "faceMatch": {
        "certainty": 0.86, // the certainty of match returned for a given attempt
        "succeeded": true  // whether the match attempt is over the match threshold
      },
      "bestScore": 0.86, // the best match rate achieved in the session to date
      "faceMatchSucceeded": true
    },
    "error": {
      "412": {
        "message": "Precondition Failed, could be returned in many situations"
      },
      "422": {
        "error": "Unexpected amount of face images extracted (we expected only one) whilst processing document."
      }
    }
  },
  "face/end": {
    "request": null,
    "response": {},
    "error": {
      "412": {
        "message": "Precondition Failed, could be returned in many situations"
      },
      "422": {
        "error": "Unexpected amount of face images extracted (we expected only one) whilst processing document."
      }
    }
  },
  "enroll": {
    "request": {
      "image": "<base64 encoded data>",
      "consumerRef": "P00X"
    },
    "response": {
      "result": "Enrolled"
    }
  },
  "tx-summary": {
    "enrollment": {
      "status": "InProgress|Active|Pending|Deactivated"
    },
    "transaction": {
      "id": "a8e60adc-06e6-4ead-b26c-5f32cdaeb7dc",
      "result": "Pending|Pass|Fail",
      "status": "Pending|Aborted|Completed|Cancelled",
      "kind": "DocuSure|VeriSure|InstaSure",
      "consumerReference": "consumer reference",
      "transactionReference": "",
      "appUserId": "Location One",
      "deviceId": "AA04E317-D56A-4EB4-B196-C5765D0FAE2C",
      "createdAt": "2014-09-25T12:27:00+0000",
      "userId": "sa"
    },
    "faceComparison": {
      "result": "Pass|Fail",
      "quality": 0.900853
    },
    "documentCheck": {
      "documentCheck": [
        {
          "id": "a8e60adc-06e6-4ead-b26c-5f32cdaeb7dc",
          "documentIndex": 0,
          "status": "Pending|Accepted|Rejected|Not Checked|Preflight Failed",
          "rejectionReasons": [
            {
              "code": "404",
              "reason": "Not found"
            }
          ],
          "warnings": [
            "warnings",
            "warnings2"
          ],
          "personalInfo": {
            "forenames": "JOHN",
            "surname": "DOE",
            "fullName": "JOHN DOE",
            "dateOfBirth": "1965-01-25",
            "gender": "Male|Female",
            "nationality": "GBR"
          },
          "document": {
            "kind": "Driving License|Passport|IdentityCard",
            "description": "DL UK Provisional Model 2007",
            "number": "123123123",
            "dateOfIssue": "2010-06-20",
            "dateOfExpiry": "2020-06-20",
            "issuingStateOrOrganisation": "GBR",
            "address": {
              "line1": "",
              "line2": "",
              "line3": "",
              "city": "",
              "state": "",
              "postcode": "",
              "country": "GBR"
            }
          },
          "coarseData": {
            "data": [
              {
                "key": "ocr",
                "value": [
                  {
                    "key": "fullName",
                    "value": "SHYROKYI"
                  },
                  {
                    "key": "givenName",
                    "value": "MAKSIM"
                  },
                  {
                    "key": "surname",
                    "value": "SHYROKYI"
                  },
                  {
                    "key": "dateOfBirth",
                    "value": "1988-06-23"
                  },
                  {
                    "key": "gender",
                    "value": "Female"
                  },
                  {
                    "key": "nationality",
                    "value": "MLT"
                  },
                  {
                    "key": "documentNumber",
                    "value": "15797921"
                  },
                  {
                    "key": "documentType",
                    "value": "IdentityCard"
                  },
                  {
                    "key": "description",
                    "value": ""
                  },
                  {
                    "key": "dateOfExpiry",
                    "value": "2024-03-24"
                  },
                  {
                    "key": "dateOfIssue",
                    "value": ""
                  },
                  {
                    "key": "address",
                    "value": ""
                  },
                  {
                    "key": "address1",
                    "value": ""
                  },
                  {
                    "key": "address2",
                    "value": ""
                  },
                  {
                    "key": "city",
                    "value": ""
                  },
                  {
                    "key": "state",
                    "value": ""
                  },
                  {
                    "key": "country",
                    "value": "MLT"
                  },
                  {
                    "key": "postcode",
                    "value": ""
                  },
                  {
                    "key": "issuingStateOrOrganization",
                    "value": "MLT"
                  }
                ]
              },
              {
                "key": "barcode",
                "value": [
                  {
                    "key": "fullName",
                    "value": "MAKSYM SHY SHYROKYI"
                  },
                  {
                    "key": "firstName",
                    "value": "MAKSYM"
                  },
                  {
                    "key": "lastName",
                    "value": "SHYROKYI"
                  },
                  {
                    "key": "middleName",
                    "value": "SHY"
                  },
                  {
                    "key": "dateOfBirth",
                    "value": "1988-06-23"
                  },
                  {
                    "key": "gender",
                    "value": "Male"
                  },
                  {
                    "key": "height",
                    "value": "5'4"
                  },
                  {
                    "key": "eyes",
                    "value": "brown"
                  },
                  {
                    "key": "identityNumber",
                    "value": "8003255092088"
                  },
                  {
                    "key": "securityNumber",
                    "value": "8099"
                  },
                  {
                    "key": "nationality",
                    "value": "USA"
                  },
                  {
                    "key": "status",
                    "value": "CITIZEN"
                  },
                  {
                    "key": "country",
                    "value": "UKR"
                  },
                  {
                    "key": "licenseNumber",
                    "value": "132730999"
                  },
                  {
                    "key": "dateOfIssue",
                    "value": "2012-09-02"
                  },
                  {
                    "key": "dateOfExpiration",
                    "value": "2018-09-02"
                  },
                  {
                    "key": "address",
                    "value": "101 MAIN ST, SUITE 123"
                  },
                  {
                    "key": "city",
                    "value": "Kyiv"
                  },
                  {
                    "key": "postCode",
                    "value": "10111"
                  },
                  {
                    "key": "documentType",
                    "value": "DrivingLicense"
                  }
                ]
              },
              {
                "key": "echip",
                "value": [
                  {
                    "key": "name",
                    "value": "MAKSIM"
                  },
                  {
                    "key": "dateOfBirth",
                    "value": "1988-06-23"
                  },
                  {
                    "key": "gender",
                    "value": "Male"
                  },
                  {
                    "key": "nationality",
                    "value": "UKR"
                  },
                  {
                    "key": "organization",
                    "value": "8039"
                  },
                  {
                    "key": "documentNumber",
                    "value": "FB024198"
                  },
                  {
                    "key": "documentType",
                    "value": "Passport"
                  },
                  {
                    "key": "dateOfExpiry",
                    "value": "2025-02-10"
                  },
                  {
                    "key": "optionalData",
                    "value": "Additional Information"
                  }
                ]
              },
              {
                "key": "mrz",
                "value": [
                  {
                    "key": "dateOfBirth",
                    "value": "1961-11-11T00:00:00"
                  },
                  {
                    "key": "dateOfBirthCheckDigit",
                    "value": "7"
                  },
                  {
                    "key": "dateOfBirthVerified",
                    "value": "true"
                  },
                  {
                    "key": "compositeCheckDigit",
                    "value": "8"
                  },
                  {
                    "key": "compositeCheckDigitVerified",
                    "value": "true"
                  },
                  {
                    "key": "dateOfExpiry",
                    "value": "2022-04-08T00:00:00"
                  },
                  {
                    "key": "dateOfExpiryCheckDigit",
                    "value": "6"
                  },
                  {
                    "key": "dateOfExpiryVerified",
                    "value": "true"
                  },
                  {
                    "key": "documentNumber",
                    "value": "501800508"
                  },
                  {
                    "key": "documentNumberCheckDigit",
                    "value": "5"
                  },
                  {
                    "key": "documentNumberVerified",
                    "value": "true"
                  },
                  {
                    "key": "documentType",
                    "value": "P"
                  },
                  {
                    "key": "gender",
                    "value": "Male"
                  },
                  {
                    "key": "givenNames",
                    "value": "DAVID SHANE"
                  },
                  {
                    "key": "issuingStateOrOrganization",
                    "value": "GBR"
                  },
                  {
                    "key": "name",
                    "value": "GLADDING"
                  },
                  {
                    "key": "nationality",
                    "value": "GBR"
                  },
                  {
                    "key": "personalNumberCheckDigit",
                    "value": "0"
                  },
                  {
                    "key": "personalNumberVerified",
                    "value": "true"
                  }
                ]
              }
            ]
          }
        }
      ],
      "nfcVerification": 2
    },
    "images": {
      "documents": [
        {
          "documentIndex": 0,
          "side": "Front|Back",
          "extractedData": "image data in base64 format"
        }
      ],
      "face": {
        "data": "image data in base64 format"
      },
      "enrolled": {
        "data": "image data in base64 format"
      },
      "echip": {
        "data": "image data in base64 format"
      },
      "extracted": {
        "data": "image data in base64 format"
      },
      "suspecting": {
        "data": "image data in base64 format"
      }
    },
    "ageCheck": {
      "result": "Pass|Fail"
    },
    "flags ": {
      "flags": [
        {
          "name": "",
          "value": ""
        }
      ]
    },
    "issues ": {
      "issues": [
        {
          "type": "error|warning|info",
          "code": "004",
          "description": "Liveness check failed"
        }
      ]
    },
    "imageInfo": {
      "images": [
        {
          "stepNumber": 0,
          "imgType": "",
          "order": ""
        }
      ]
    },
    "changedByClient": "System"
  }
}
