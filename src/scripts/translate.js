const { Translate } = require("@google-cloud/translate").v2;

const KeyFile = require("../auth/googleAuth.json");
const { project_id, client_email, private_key } = KeyFile;

const googleTranslate = new Translate({
    credentials: { private_key, client_email },
    projectId: project_id,
});

//Translate a string "text" to target language "target"
export const translate = async (text, target) => {
    const [translations] = await googleTranslate.translate(text, target);
    const translation = Array.isArray(translations) ? translations[0] : translations;
    return translation
};

//Detect the language of a string
export const detect = async (text) => {
    const [detections] = await googleTranslate.detect(text);
    const detection = Array.isArray(detections) ? detections[0] : detections;
    const language = detection.language;
    return language;
};
