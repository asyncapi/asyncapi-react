export const weather = `
asyncapi: 2.1.0
info:
  title: "OpenWeatherMap Camunda Worker API"
  description: "Get current weather, daily forecast for 16 days, and 3-hourly forecast 5 days for your city. Helpful stats, graphics, and this day in history charts are available for your reference. Interactive maps show precipitation, clouds, pressure, wind around your location stations. Data is available in JSON, XML, or HTML format. <br/><br/>**Note**: This sample AsyncAPI file covers the \`current\` endpoint only from the OpenWeatherMap API.<br/>**Note**: This sample AsyncAPI is based on one available at  https://app.swaggerhub.com/apis/IdRatherBeWriting/open-weather_map_api/2.5"
  version: "0.1.0"
  termsOfService: "https://openweather.co.uk/storage/app/media/Terms/Openweather_website_terms_and_conditions_of_use.pdf"
  contact:
    name: OpenWeatherMap API
    url: https://openweathermap.org/api
    email: info@openweathermap.org
  license:
    name: CC Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
    url: https://openweathermap.org/price
channels:
  openWeatherMap:
    publish:
      message:
        $ref: '#/components/messages/checkWeather'
    subscribe:
      message:
        $ref: '#/components/messages/checkWeatherResponse'
components:
  messages:
    checkWeather:
      externalDocs:
        description: Call current weather data for one location
        url: https://openweathermap.org/current#one
      payload:
        $ref: "#/components/schemas/checkWeather"
    checkWeatherResponse:
      externalDocs:
        description: Weather fields in API response
        url: https://openweathermap.org/current#parameter
      payload:
        $ref: "#/components/schemas/checkWeatherResponse"
  schemas:
    checkWeather:
      type: object
      description: "All parameters are optional, but you must select at least one parameter. Calling the API by city ID (using the id parameter) will provide the most precise location results."
      properties:
        id:
          name: id
          description: "**City ID**. *Example: \`2172797\`*. You can call by city ID. API responds with exact result. The List of city IDs can be downloaded [here](http://bulk.openweathermap.org/sample/). You can include multiple cities in parameter &mdash; just separate them by commas. The limit of locations is 20. *Note: A single ID counts as a one API call. So, if you have city IDs. it's treated as 3 API calls.*"
          type: string
        lat:
          name: lat
          description: "**Latitude**. *Example: 35*. The latitude cordinate of the location of your interest. Must use with \`lon\`."
          type: string
        lon:
          name: lon
          description: "**Longitude**. *Example: 139*. Longitude cordinate of the location of your interest. Must use with \`lat\`."
          type: string
        zip:
          name: zip
          description: "**Zip code**. Search by zip code. *Example: 95050,us*. Please note if country is not specified then the search works for USA as a default."
          type: string
        units:
          name: units
          description: '**Units**. *Example: imperial*. Possible values: \`standard\`, \`metric\`, and \`imperial\`. When you do not use units parameter, format is \`standard\` by default.'
          type: string
          enum: [standard, metric, imperial]
          default: "imperial"
        lang:
          name: lang
          description: '**Language**. *Example: en*. You can use lang parameter to get the output in your language. We support the following languages that you can use with the corresponded lang values: Albanian - \`al\`, Afrikaans - \`af\`, Arabic - \`ar\`, Azerbaijani - \`az\`,Bulgarian - \`bg\`, Catalan - \`ca\`, Czech - \`cz\`, Danish - \`da\`,German - \`de\`, Greek - \`el\`, English - \`en\`, Persian (Farsi) - \`fa\`, Finnish - \`fi\`, French - \`fr\`, Galician - \`gl\`, Hebrew - \`he\`, Hindi - \`hi\`, Croatian - \`hr\`, Hungarian - \`hu\`, Italian - \`it\`, Japanese - \`ja\`, Korean - \`kr\`, Latvian - \`la\`, Lithuanian - \`lt\`, Macedonian - \`mk\`, Norwegian - \`hr\`, Dutch - \`nl\`, Polish - \`pl\`, Portuguese - \`pt\`, Português Brasil - \`pt_br\`, Romanian - \`ro\`, Russian - \`ru\`, Swedish - \`se\`, Swedish - \`sv\`,Slovak - \`sk\`, Slovenian - \`sl\`, Spanish - \`es\`, Spanish - \`sp\`, Serbian - \`sr\`, Thai - \`th\`, Turkish - \`tr\`, Ukrainian - \`ua\`, Ukrainian - \`ua\`, Vietnamese - \`vi\`, Chinese Simplified - \`zh_cn\`, Chinese Traditional - \`zh_tw\`, Zulu - \`zu\`.'
          type: string
          enum: [al, af, ar, az, bg, ca, cz, da, de, el, en, fa, fi, fr, gl, he, hi, hr, hu, it, ja, kr, la, lt, mk, no, nl, pl, pt, ro, ru, se, sv, sk, sl, es, sp, th, sr, tr, ua, uk, vi, zh_cn, zh_tw]
          default: "en"
        mode:
          name: mode
          description: "**Mode**. *Example: html*. Determines format of response. Possible values are \`xml\` and \`html\`. If mode parameter is empty the format is \`json\` by default."
          type: string
          enum: [json, xml, html]
          default: "json"
    checkWeatherResponse:
      type: object
      properties:
        coord:
          $ref: '#/components/schemas/Coord'
        weather:
          type: array
          items:
            $ref: '#/components/schemas/Weather'
          description: (more info Weather condition codes)
        base:
          type: string
          description: Internal parameter
          example: cmc stations
        main:
          $ref: '#/components/schemas/Main'
        visibility:
          type: integer
          description: Visibility, meter
          example: 16093
        wind:
          $ref: '#/components/schemas/Wind'
        clouds:
          $ref: '#/components/schemas/Clouds'
        rain:
          $ref: '#/components/schemas/Rain'
        snow:
          $ref: '#/components/schemas/Snow'
        dt:
          type: integer
          description: Time of data calculation, unix, UTC
          format: int32
          example: 1435658272
        sys:
          $ref: '#/components/schemas/Sys'
        timezone:
          type: integer
          description: Shift in seconds from UTC
          format: int32
          example: -25200
        id:
          type: integer
          description: City ID
          format: int32
          example: 2172797
        name:
          type: string
          example: Cairns
        cod:
          type: integer
          description: Internal parameter
          format: int32
          example: 200
    Coord:
      title: Coord
      type: object
      properties:
        lon:
          type: number
          description: City geo location, longitude
          example: 145.77000000000001
        lat:
          type: number
          description: City geo location, latitude
          example: -16.920000000000002
    Weather:
      title: Weather
      type: object
      properties:
        id:
          type: integer
          description: Weather condition id
          format: int32
          example: 803
        main:
          type: string
          description: Group of weather parameters (Rain, Snow, Extreme etc.)
          example: Clouds
        description:
          type: string
          description: Weather condition within the group
          example: broken clouds
        icon:
          type: string
          description: Weather icon id
          example: 04n
    Main:
      title: Main
      type: object
      properties:
        temp:
          type: number
          description: 'Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.'
          example: 293.25
        feels_like:
          type: number
          description: 'Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.'
          example: 293.25
        pressure:
          type: integer
          description: Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
          format: int32
          example: 1019
        humidity:
          type: integer
          description: Humidity, %
          format: int32
          example: 83
        temp_min:
          type: number
          description: 'Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.'
          example: 289.81999999999999
        temp_max:
          type: number
          description: 'Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.'
          example: 295.37
        sea_level:
          type: number
          description: Atmospheric pressure on the sea level, hPa
          example: 984
        grnd_level:
          type: number
          description: Atmospheric pressure on the ground level, hPa
          example: 990
    Wind:
      title: Wind
      type: object
      properties:
        speed:
          type: number
          description: 'Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.'
          example: 5.0999999999999996
        deg:
          type: integer
          description: Wind direction, degrees (meteorological)
          format: int32
          example: 150
        gust:
          type: number
          description: 'Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour'
          example: 6.26
    Clouds:
      title: Clouds
      type: object
      properties:
        all:
          type: integer
          description: Cloudiness, %
          format: int32
          example: 75
    Rain:
      title: Rain
      type: object
      properties:
        1h:
          type: integer
          description: Rain volume for the last 1 hour, mm
          format: int32
          example: 2
        3h:
          type: integer
          description: Rain volume for the last 3 hours, mm
          format: int32
          example: 3
    Snow:
      title: Snow
      type: object
      properties:
        1h:
          type: number
          description: Snow volume for the last 1 hours, mm
          example: 3
        3h:
          type: number
          description: Snow volume for the last 3 hours, mm
          example: 6
    Sys:
      title: Sys
      type: object
      properties:
        type:
          type: integer
          description: Internal parameter
          format: int32
          example: 1
        id:
          type: integer
          description: Internal parameter
          format: int32
          example: 8166
        message:
          type: number
          description: Internal parameter
          example: 0.0166
        country:
          type: string
          description: Country code (GB, JP etc.)
          example: AU
        sunrise:
          type: integer
          description: Sunrise time, unix, UTC
          format: int32
          example: 1435610796
        sunset:
          type: integer
          description: Sunset time, unix, UTC
          format: int32
          example: 1435650870
`;
