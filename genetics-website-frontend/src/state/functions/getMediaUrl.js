import {api} from "../consts/api";
import {AUDIO, DOCUMENT, IMAGE, TEXT, VIDEO} from "../consts/contentTypes";

export function getMediaUrl(id, mediaType) {
    switch (mediaType.split('/')[0]) {
        case IMAGE:
            return api.url + api.getImage(id);
        case VIDEO:
            return api.url + api.getVideo(id);
        case AUDIO:
            return api.url + api.getAudio(id);
        case DOCUMENT:
            return api.url + api.getDocs(id);
        case TEXT:
            return api.url + api.getDocs(id);
        default:
            return '';
    }
}