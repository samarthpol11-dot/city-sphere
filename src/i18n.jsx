import { createContext, useContext, useState, useCallback } from 'react'

export const translations = {
  en: {
    nav: { products:'Products', process:'Process', gallery:'Gallery', about:'About', contact:'Contact', quote:'Get a Quote', cart:'Cart', login:'Log in', logout:'Log out' },
    hero: {
      eyebrow:'PRECISION TYRE RETREADING',
      line1:'Every tyre carries', line2:'a second life', accent:'built in.',
      sub:'City Sphere restores worn truck, bus and off-road tyres to first-life performance — engineered on hot-cure lines, tested to IS 15633, and back on the road in days, not weeks.',
      ctaQuote:'Request a Quote', ctaProcess:'See the Process',
      stat1v:'40,000+', stat1l:'tyres retreaded / yr', stat2v:'70%', stat2l:'less rubber per tyre', stat3v:'18', stat3l:'years in operation'
    },
    products: {
      eyebrow:'PRODUCT RANGE', heading:'Built for the fleets that carry the country.',
      intro:'Twelve casing and material categories, one shared standard: every carcass is inspected, shear-tested and matched to a tread compound built for its duty cycle.',
      priceLabel:'Approx. price:', perTyre:'/ tyre', onRequest:'On request', onSiteVisit:'On site visit',
      addToCart:'Add to Cart', added:'Added ✓', getBestPrice:'Get Best Price',
      names: {
        'Truck & Bus Tyre Retreading':'Truck & Bus Tyre Retreading',
        'Steer-Axle Tyre Retreading':'Steer-Axle Tyre Retreading',
        'Passenger Car Tyre Retreading':'Passenger Car Tyre Retreading',
        'Passenger Car Tyre Retreading — Performance':'Passenger Car Tyre Retreading — Performance',
        'SUV Tyre Retreading':'SUV Tyre Retreading',
        'LCV Tyre Retreading':'LCV Tyre Retreading',
        'Earthmover Tyre Retreading':'Earthmover Tyre Retreading',
        'Tractor-Trailer Tyre Retreading':'Tractor-Trailer Tyre Retreading',
        'Tractor Tyre Retreading':'Tractor Tyre Retreading',
        'Three-Wheeler & Utility Tyre':'Three-Wheeler & Utility Tyre',
        'ATV / UTV Tyre Retreading':'ATV / UTV Tyre Retreading',
        'Forklift & Industrial Solid Tyres':'Forklift & Industrial Solid Tyres'
      }
    },
    process: {
      eyebrow:'THE RETREAD CYCLE', heading:'Six stages. One casing, made new again.',
      intro:'Retreading is circular by nature — the same casing can pass through this cycle two, sometimes three times before retirement.',
      steps: [
        {t:'Intake & Inspection', d:'Every casing is shearography and visual inspected; only sound carcasses proceed.'},
        {t:'Buffing', d:'Old tread is skived away on a computer-profiled buffer to the exact casing radius.'},
        {t:'Cushion Gum', d:'A bonding layer of raw rubber is applied evenly across the buffed surface.'},
        {t:'Tread Application', d:'New tread rubber is wound or applied to match the original tread design.'},
        {t:'Curing', d:'The assembly cures under heat and pressure, chemically bonding tread to casing.'},
        {t:'Final Inspection', d:'Balance, shear and dimension checks clear the tyre for dispatch.'}
      ]
    },
    gallery: {
      eyebrow:'INSIDE THE PLANT', heading:'A look at the floor.',
      intro:'Technical snapshots from across the retreading line, from intake to finished-goods dispatch.',
      items: [
        {tag:'STAGE 01', title:'Casing inspection bay'},
        {tag:'STAGE 02', title:'CNC buffing line'},
        {tag:'STAGE 03', title:'Cushion gum application'},
        {tag:'STAGE 05', title:'Autoclave curing chamber'},
        {tag:'STAGE 06', title:'Quality assurance lab'},
        {tag:'DISPATCH', title:'Finished-goods yard'}
      ]
    },
    about: {
      eyebrow:'ABOUT CITY SPHERE', heading:'Retreading is manufacturing, not repair.',
      lead:'City Sphere was founded on a simple engineering premise: a sound tyre casing is worth more than its scrap rubber, if you rebuild it properly.',
      p2:'Since 2008 we\u2019ve run a single-site hot-cure and mould-cure facility, working exclusively with fleet operators, transport contractors and equipment owners who measure tyres in cost-per-kilometre, not just purchase price.',
      p3:'Every casing that enters our yard is tracked from intake to dispatch. Nothing is retreaded on guesswork \u2014 shearography, dimension checks and cure records back every tyre that leaves.',
      stat1v:'18', stat1l:'years of continuous operation', stat2v:'40K+', stat2l:'tyres retreaded annually',
      stat3v:'70%', stat3l:'raw rubber saved per casing', stat4v:'220+', stat4l:'fleet & contractor clients'
    },
    contact: {
      eyebrow:'GET IN TOUCH', heading:'Send us your fleet\u2019s casings.',
      intro:'Tell us your tyre sizes and monthly volume and we\u2019ll come back with a retread programme and pricing within one working day.',
      nameLabel:'Full name', companyLabel:'Company', emailLabel:'Email', phoneLabel:'Phone',
      messageLabel:'Tyre sizes & monthly volume', messagePlaceholder:'e.g. 40 \u00D7 11R22.5 per month, steer & drive positions',
      send:'Send Enquiry',
      plantLabel:'Plant & registered office', plantAddr:'Near New RTO Office, MIDC, Baramati, Maharashtra 413133',
      phoneCardLabel:'Phone', phoneNo:'+91 20 4567 8899', emailCardLabel:'Email', emailAddr:'quotes@citysphere-tyres.example',
      hoursLabel:'Working hours', hoursText:'Monday \u2013 Saturday', monFri:'Mon \u2013 Fri', monFriTime:'9:00 \u2013 19:00',
      sat:'Saturday', satTime:'9:00 \u2013 15:00', mapLink:'Open in Google Maps', directions:'Get Directions'
    },
    footer: { note:'\u00A9 2026 City Sphere Tyre Retreading. All specifications indicative \u2014 confirm against tyre sidewall markings.' },
    auth: {
      title:'Log in to add to cart', nameLabel:'Your name', emailLabel:'Email', passwordLabel:'Password (any value works)',
      submit:'Log in', note:'This is a demo login \u2014 no account is created on any server, details stay on this device.',
      close:'Close', loggedInAs:'Signed in as'
    },
    cart: {
      title:'Your cart', empty:'Your cart is empty.', remove:'Remove', qty:'Qty', subtotal:'Subtotal', checkout:'Checkout via Email', continue:'Continue browsing'
    },
    theme: { light:'Light', dark:'Dark' }
  },

  hi: {
    nav: { products:'उत्पाद', process:'प्रक्रिया', gallery:'गैलरी', about:'हमारे बारे में', contact:'संपर्क करें', quote:'कोटेशन प्राप्त करें', cart:'कार्ट', login:'लॉग इन करें', logout:'लॉग आउट' },
    hero: {
      eyebrow:'सटीक टायर रीट्रेडिंग',
      line1:'हर टायर में', line2:'एक नया जीवन', accent:'समाहित है।',
      sub:'सिटी स्फीयर घिसे हुए ट्रक, बस और ऑफ-रोड टायरों को पहले जैसे प्रदर्शन में बहाल करता है — हॉट-क्योर लाइनों पर तैयार, IS 15633 के अनुसार परीक्षित, और हफ्तों की बजाय कुछ ही दिनों में सड़क पर वापस।',
      ctaQuote:'कोटेशन मांगें', ctaProcess:'प्रक्रिया देखें',
      stat1v:'40,000+', stat1l:'टायर प्रति वर्ष रीट्रेड', stat2v:'70%', stat2l:'प्रति टायर कम रबर', stat3v:'18', stat3l:'वर्षों का अनुभव'
    },
    products: {
      eyebrow:'उत्पाद श्रेणी', heading:'देश को ढोने वाले बेड़ों के लिए बनाया गया।',
      intro:'बारह केसिंग और सामग्री श्रेणियाँ, एक साझा मानक: हर केसिंग की जाँच, शियर-टेस्ट, और उसकी ड्यूटी साइकिल के अनुसार ट्रेड कंपाउंड से मिलान किया जाता है।',
      priceLabel:'अनुमानित मूल्य:', perTyre:'/ टायर', onRequest:'अनुरोध पर', onSiteVisit:'साइट विज़िट पर',
      addToCart:'कार्ट में जोड़ें', added:'जोड़ा गया ✓', getBestPrice:'सर्वोत्तम मूल्य पाएं',
      names: {
        'Truck & Bus Tyre Retreading':'ट्रक और बस टायर रीट्रेडिंग',
        'Steer-Axle Tyre Retreading':'स्टीयर-एक्सल टायर रीट्रेडिंग',
        'Passenger Car Tyre Retreading':'कार टायर रीट्रेडिंग',
        'Passenger Car Tyre Retreading — Performance':'कार टायर रीट्रेडिंग — परफॉर्मेंस',
        'SUV Tyre Retreading':'SUV टायर रीट्रेडिंग',
        'LCV Tyre Retreading':'LCV टायर रीट्रेडिंग',
        'Earthmover Tyre Retreading':'अर्थमूवर टायर रीट्रेडिंग',
        'Tractor-Trailer Tyre Retreading':'ट्रैक्टर-ट्रेलर टायर रीट्रेडिंग',
        'Tractor Tyre Retreading':'ट्रैक्टर टायर रीट्रेडिंग',
        'Three-Wheeler & Utility Tyre':'थ्री-व्हीलर और यूटिलिटी टायर',
        'ATV / UTV Tyre Retreading':'ATV / UTV टायर रीट्रेडिंग',
        'Forklift & Industrial Solid Tyres':'फोर्कलिफ्ट और औद्योगिक सॉलिड टायर'
      }
    },
    process: {
      eyebrow:'रीट्रेड चक्र', heading:'छह चरण। एक केसिंग, फिर से नई।',
      intro:'रीट्रेडिंग स्वभाव से चक्रीय है — एक ही केसिंग रिटायर होने से पहले इस चक्र से दो, कभी-कभी तीन बार गुज़र सकती है।',
      steps: [
        {t:'प्राप्ति और निरीक्षण', d:'हर केसिंग की शियरोग्राफी और दृश्य जाँच की जाती है; केवल सुदृढ़ केसिंग ही आगे बढ़ती हैं।'},
        {t:'बफिंग', d:'पुराना ट्रेड कंप्यूटर-प्रोफाइल्ड बफर पर केसिंग के सटीक व्यास तक हटाया जाता है।'},
        {t:'कुशन गम', d:'बफ की गई सतह पर कच्चे रबर की एक बॉन्डिंग परत समान रूप से लगाई जाती है।'},
        {t:'ट्रेड एप्लिकेशन', d:'मूल ट्रेड डिज़ाइन से मेल खाने के लिए नया ट्रेड रबर लगाया जाता है।'},
        {t:'क्योरिंग', d:'असेंबली गर्मी और दबाव में क्योर होती है, जिससे ट्रेड केसिंग से रासायनिक रूप से जुड़ जाता है।'},
        {t:'अंतिम निरीक्षण', d:'बैलेंस, शियर और आयाम जाँच के बाद टायर डिस्पैच के लिए स्वीकृत होता है।'}
      ]
    },
    gallery: {
      eyebrow:'प्लांट के अंदर', heading:'फ्लोर की एक झलक।',
      intro:'प्राप्ति से लेकर तैयार माल की डिस्पैच तक, रीट्रेडिंग लाइन की तकनीकी झलकियाँ।',
      items: [
        {tag:'चरण 01', title:'केसिंग निरीक्षण बे'},
        {tag:'चरण 02', title:'सीएनसी बफिंग लाइन'},
        {tag:'चरण 03', title:'कुशन गम एप्लिकेशन'},
        {tag:'चरण 05', title:'ऑटोक्लेव क्योरिंग चैंबर'},
        {tag:'चरण 06', title:'गुणवत्ता जांच लैब'},
        {tag:'डिस्पैच', title:'तैयार माल यार्ड'}
      ]
    },
    about: {
      eyebrow:'सिटी स्फीयर के बारे में', heading:'रीट्रेडिंग मरम्मत नहीं, विनिर्माण है।',
      lead:'सिटी स्फीयर की स्थापना एक सरल इंजीनियरिंग सिद्धांत पर हुई: एक सुदृढ़ टायर केसिंग, यदि सही तरीके से पुनर्निर्मित की जाए, तो उसके स्क्रैप रबर से कहीं अधिक मूल्यवान होती है।',
      p2:'2008 से हम एक ही स्थान पर हॉट-क्योर और मोल्ड-क्योर सुविधा संचालित कर रहे हैं, और केवल उन फ्लीट ऑपरेटरों, ट्रांसपोर्ट कॉन्ट्रैक्टरों और उपकरण मालिकों के साथ काम करते हैं जो टायर को प्रति-किलोमीटर लागत में मापते हैं, केवल खरीद मूल्य में नहीं।',
      p3:'हमारे यार्ड में आने वाली हर केसिंग को प्राप्ति से डिस्पैच तक ट्रैक किया जाता है। कुछ भी अंदाज़े से रीट्रेड नहीं होता — शियरोग्राफी, आयाम जाँच और क्योर रिकॉर्ड हर टायर के साथ जाते हैं।',
      stat1v:'18', stat1l:'वर्षों से निरंतर संचालन', stat2v:'40K+', stat2l:'टायर प्रति वर्ष रीट्रेड',
      stat3v:'70%', stat3l:'प्रति केसिंग बचा कच्चा रबर', stat4v:'220+', stat4l:'फ्लीट और कॉन्ट्रैक्टर ग्राहक'
    },
    contact: {
      eyebrow:'संपर्क करें', heading:'अपने बेड़े की केसिंग हमें भेजें।',
      intro:'हमें अपने टायर साइज़ और मासिक मात्रा बताएं, हम एक कार्य दिवस के भीतर रीट्रेड प्रोग्राम और मूल्य के साथ जवाब देंगे।',
      nameLabel:'पूरा नाम', companyLabel:'कंपनी', emailLabel:'ईमेल', phoneLabel:'फोन',
      messageLabel:'टायर साइज़ और मासिक मात्रा', messagePlaceholder:'उदा. 40 \u00D7 11R22.5 प्रति माह, स्टीयर व ड्राइव पोज़िशन',
      send:'पूछताछ भेजें',
      plantLabel:'प्लांट व पंजीकृत कार्यालय', plantAddr:'नए आरटीओ कार्यालय के पास, एमआईडीसी, बारामती, महाराष्ट्र 413133',
      phoneCardLabel:'फोन', phoneNo:'+91 20 4567 8899', emailCardLabel:'ईमेल', emailAddr:'quotes@citysphere-tyres.example',
      hoursLabel:'कार्य समय', hoursText:'सोमवार \u2013 शनिवार', monFri:'सोम \u2013 शुक्र', monFriTime:'9:00 \u2013 19:00',
      sat:'शनिवार', satTime:'9:00 \u2013 15:00', mapLink:'गूगल मैप्स में खोलें', directions:'दिशा-निर्देश पाएं'
    },
    footer: { note:'\u00A9 2026 सिटी स्फीयर टायर रीट्रेडिंग। सभी विवरण संकेतात्मक हैं \u2014 कृपया टायर साइडवॉल मार्किंग से पुष्टि करें।' },
    auth: {
      title:'कार्ट में जोड़ने के लिए लॉग इन करें', nameLabel:'आपका नाम', emailLabel:'ईमेल', passwordLabel:'पासवर्ड (कोई भी मान्य)',
      submit:'लॉग इन करें', note:'यह एक डेमो लॉगिन है \u2014 किसी सर्वर पर कोई खाता नहीं बनता, विवरण केवल इस डिवाइस पर रहता है।',
      close:'बंद करें', loggedInAs:'लॉग इन:'
    },
    cart: {
      title:'आपका कार्ट', empty:'आपका कार्ट खाली है।', remove:'हटाएं', qty:'मात्रा', subtotal:'उप-योग', checkout:'ईमेल द्वारा चेकआउट', continue:'खरीदारी जारी रखें'
    },
    theme: { light:'लाइट', dark:'डार्क' }
  },

  mr: {
    nav: { products:'उत्पादने', process:'प्रक्रिया', gallery:'गॅलरी', about:'आमच्याबद्दल', contact:'संपर्क', quote:'कोटेशन मिळवा', cart:'कार्ट', login:'लॉग इन करा', logout:'लॉग आउट' },
    hero: {
      eyebrow:'अचूक टायर रीट्रेडिंग',
      line1:'प्रत्येक टायरमध्ये', line2:'एक नवीन आयुष्य', accent:'सामावलेले असते.',
      sub:'सिटी स्फिअर झिजलेले ट्रक, बस आणि ऑफ-रोड टायर पहिल्यासारख्या कामगिरीत पुनर्संचयित करते — हॉट-क्युअर लाईनवर तयार, IS 15633 नुसार तपासलेले, आणि आठवड्यांऐवजी काही दिवसांत रस्त्यावर परत.',
      ctaQuote:'कोटेशन मागवा', ctaProcess:'प्रक्रिया पहा',
      stat1v:'40,000+', stat1l:'टायर दरवर्षी रीट्रेड', stat2v:'70%', stat2l:'प्रति टायर कमी रबर', stat3v:'18', stat3l:'वर्षांचा अनुभव'
    },
    products: {
      eyebrow:'उत्पादन श्रेणी', heading:'देश वाहून नेणाऱ्या ताफ्यांसाठी बनवलेले.',
      intro:'बारा केसिंग व साहित्य श्रेण्या, एकच समान मानक: प्रत्येक केसिंगची तपासणी, शिअर-चाचणी आणि तिच्या ड्युटी सायकलनुसार ट्रेड कंपाउंडशी जुळणी केली जाते.',
      priceLabel:'अंदाजे किंमत:', perTyre:'/ टायर', onRequest:'विनंतीनुसार', onSiteVisit:'साइट भेटीनुसार',
      addToCart:'कार्टमध्ये टाका', added:'टाकले ✓', getBestPrice:'सर्वोत्तम किंमत मिळवा',
      names: {
        'Truck & Bus Tyre Retreading':'ट्रक व बस टायर रीट्रेडिंग',
        'Steer-Axle Tyre Retreading':'स्टीअर-एक्सल टायर रीट्रेडिंग',
        'Passenger Car Tyre Retreading':'कार टायर रीट्रेडिंग',
        'Passenger Car Tyre Retreading — Performance':'कार टायर रीट्रेडिंग — परफॉर्मन्स',
        'SUV Tyre Retreading':'SUV टायर रीट्रेडिंग',
        'LCV Tyre Retreading':'LCV टायर रीट्रेडिंग',
        'Earthmover Tyre Retreading':'अर्थमूव्हर टायर रीट्रेडिंग',
        'Tractor-Trailer Tyre Retreading':'ट्रॅक्टर-ट्रेलर टायर रीट्रेडिंग',
        'Tractor Tyre Retreading':'ट्रॅक्टर टायर रीट्रेडिंग',
        'Three-Wheeler & Utility Tyre':'थ्री-व्हीलर व युटिलिटी टायर',
        'ATV / UTV Tyre Retreading':'ATV / UTV टायर रीट्रेडिंग',
        'Forklift & Industrial Solid Tyres':'फोर्कलिफ्ट व औद्योगिक सॉलिड टायर'
      }
    },
    process: {
      eyebrow:'रीट्रेड चक्र', heading:'सहा टप्पे. एक केसिंग, पुन्हा नवीन.',
      intro:'रीट्रेडिंग स्वभावतः चक्राकार आहे — एकच केसिंग निवृत्त होण्यापूर्वी या चक्रातून दोन, कधी तीन वेळा जाऊ शकते.',
      steps: [
        {t:'स्वीकृती व तपासणी', d:'प्रत्येक केसिंगची शिअरोग्राफी व दृश्य तपासणी केली जाते; फक्त सुस्थितीतील केसिंगच पुढे जातात.'},
        {t:'बफिंग', d:'जुना ट्रेड संगणक-प्रोफाइल्ड बफरवर केसिंगच्या नेमक्या त्रिज्येपर्यंत काढला जातो.'},
        {t:'कुशन गम', d:'बफ केलेल्या पृष्ठभागावर कच्च्या रबराचा एक बंधक थर समान रीतीने लावला जातो.'},
        {t:'ट्रेड लावणे', d:'मूळ ट्रेड डिझाइनशी जुळण्यासाठी नवीन ट्रेड रबर लावले जाते.'},
        {t:'क्युअरिंग', d:'संच उष्णता व दाबाखाली क्युअर होतो, ज्यामुळे ट्रेड केसिंगला रासायनिकरीत्या जोडला जातो.'},
        {t:'अंतिम तपासणी', d:'बॅलन्स, शिअर व मापन तपासणीनंतर टायर डिस्पॅचसाठी मंजूर होतो.'}
      ]
    },
    gallery: {
      eyebrow:'प्लांटच्या आत', heading:'फ्लोअरची एक झलक.',
      intro:'स्वीकृतीपासून तयार मालाच्या डिस्पॅचपर्यंत, रीट्रेडिंग लाईनवरील तांत्रिक क्षणचित्रे.',
      items: [
        {tag:'टप्पा 01', title:'केसिंग तपासणी विभाग'},
        {tag:'टप्पा 02', title:'सीएनसी बफिंग लाईन'},
        {tag:'टप्पा 03', title:'कुशन गम अनुप्रयोग'},
        {tag:'टप्पा 05', title:'ऑटोक्लेव्ह क्युअरिंग चेंबर'},
        {tag:'टप्पा 06', title:'गुणवत्ता तपासणी प्रयोगशाळा'},
        {tag:'डिस्पॅच', title:'तयार माल यार्ड'}
      ]
    },
    about: {
      eyebrow:'सिटी स्फिअरबद्दल', heading:'रीट्रेडिंग म्हणजे दुरुस्ती नव्हे, उत्पादन आहे.',
      lead:'सिटी स्फिअरची स्थापना एका साध्या अभियांत्रिकी तत्त्वावर झाली: योग्य प्रकारे पुनर्बांधणी केल्यास, सुस्थितीतील टायर केसिंग तिच्या भंगार रबरापेक्षा जास्त मौल्यवान असते.',
      p2:'2008 पासून आम्ही एकाच ठिकाणी हॉट-क्युअर व मोल्ड-क्युअर सुविधा चालवत आहोत, आणि फक्त अशा फ्लीट ऑपरेटर्स, ट्रान्सपोर्ट कंत्राटदार व उपकरण मालकांसोबत काम करतो जे टायरचे मूल्य प्रति-किलोमीटर खर्चात मोजतात, केवळ खरेदी किमतीत नव्हे.',
      p3:'आमच्या यार्डमध्ये येणाऱ्या प्रत्येक केसिंगचा मागोवा स्वीकृतीपासून डिस्पॅचपर्यंत ठेवला जातो. कोणतीही गोष्ट अंदाजाने रीट्रेड होत नाही — शिअरोग्राफी, मापन तपासणी व क्युअर नोंदी प्रत्येक टायरसोबत असतात.',
      stat1v:'18', stat1l:'वर्षांचा सतत कार्यरत अनुभव', stat2v:'40K+', stat2l:'टायर दरवर्षी रीट्रेड',
      stat3v:'70%', stat3l:'प्रति केसिंग वाचलेले कच्चे रबर', stat4v:'220+', stat4l:'फ्लीट व कंत्राटदार ग्राहक'
    },
    contact: {
      eyebrow:'संपर्क साधा', heading:'तुमच्या ताफ्यातील केसिंग आम्हाला पाठवा.',
      intro:'आम्हाला तुमचे टायर आकार व मासिक प्रमाण सांगा, आम्ही एका कामकाजाच्या दिवसात रीट्रेड कार्यक्रम व किंमतीसह उत्तर देऊ.',
      nameLabel:'पूर्ण नाव', companyLabel:'कंपनी', emailLabel:'ईमेल', phoneLabel:'फोन',
      messageLabel:'टायर आकार व मासिक प्रमाण', messagePlaceholder:'उदा. 40 \u00D7 11R22.5 दरमहा, स्टीअर व ड्राइव्ह पोझिशन',
      send:'चौकशी पाठवा',
      plantLabel:'प्लांट व नोंदणीकृत कार्यालय', plantAddr:'नवीन आरटीओ कार्यालयाजवळ, एमआयडीसी, बारामती, महाराष्ट्र 413133',
      phoneCardLabel:'फोन', phoneNo:'+91 20 4567 8899', emailCardLabel:'ईमेल', emailAddr:'quotes@citysphere-tyres.example',
      hoursLabel:'कामाच्या वेळा', hoursText:'सोमवार \u2013 शनिवार', monFri:'सोम \u2013 शुक्र', monFriTime:'9:00 \u2013 19:00',
      sat:'शनिवार', satTime:'9:00 \u2013 15:00', mapLink:'गूगल मॅप्समध्ये उघडा', directions:'दिशा मिळवा'
    },
    footer: { note:'\u00A9 2026 सिटी स्फिअर टायर रीट्रेडिंग. सर्व तपशील निदर्शक आहेत \u2014 कृपया टायर साइडवॉल मार्किंगनुसार खात्री करा.' },
    auth: {
      title:'कार्टमध्ये टाकण्यासाठी लॉग इन करा', nameLabel:'तुमचे नाव', emailLabel:'ईमेल', passwordLabel:'पासवर्ड (कोणतेही चालेल)',
      submit:'लॉग इन करा', note:'हे डेमो लॉगिन आहे \u2014 कोणत्याही सर्व्हरवर खाते तयार होत नाही, तपशील फक्त या डिव्हाइसवर राहतात.',
      close:'बंद करा', loggedInAs:'लॉग इन:'
    },
    cart: {
      title:'तुमचे कार्ट', empty:'तुमचे कार्ट रिकामे आहे.', remove:'काढा', qty:'प्रमाण', subtotal:'उप-बेरीज', checkout:'ईमेलद्वारे चेकआउट', continue:'खरेदी सुरू ठेवा'
    },
    theme: { light:'लाइट', dark:'डार्क' }
  }
}

const LangContext = createContext(null)

function getPath(obj, path){
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj)
}

export function LanguageProvider({ children }){
  const [lang, setLangState] = useState(() => localStorage.getItem('csphere_lang') || 'en')

  const setLang = useCallback((l) => {
    setLangState(l)
    localStorage.setItem('csphere_lang', l)
  }, [])

  const t = useCallback((key) => {
    const val = getPath(translations[lang], key)
    if (val !== undefined) return val
    const fallback = getPath(translations.en, key)
    return fallback !== undefined ? fallback : key
  }, [lang])

  // returns the raw (possibly array/object) value for a namespace, e.g. process steps
  const tRaw = useCallback((key) => {
    const val = getPath(translations[lang], key)
    return val !== undefined ? val : getPath(translations.en, key)
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t, tRaw }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang(){
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
