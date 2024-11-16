import getVideoId from "get-video-id";

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

/**
 * Get the value assigned to a "src" attribute in a string, or undefined.
 */
function getSrc(input: string) {
  const srcRegEx = /src="(.*?)"/gm;
  const matches = srcRegEx.exec(input);
  if (matches && matches.length >= 2) {
    return matches[1];
  }
  return undefined;
}

/**
 * Prepare the URL by doing common cleanup operations common for all URL types.
 */
function sanitizeUrl(input: string) {
  let string_ = input;
  if (/<iframe/gi.test(string_)) {
    string_ = getSrc(string_) || "";
  }

  // Remove surrounding whitespaces or linefeeds
  string_ = string_.trim();

  // Remove any leading `www.`
  string_ = string_.replace("/www.", "/");
  return string_;
}

export const generateYoutubeThumbnailUrl = (id: string) => {
  return {
    thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    _data: null,
  };
};

export const generateVimeoThumbnailUrl = async (id: string, url: string) => {
  // Using the original URL is preferred for managing private videos
  const queryUrl = isValidUrl(url) ? url : `https://vimeo.com/${id}`;

  const data = await fetch(`https://vimeo.com/api/oembed.json?url=${queryUrl}`);
  const oembedData = await data.json();
  return { thumbnail: `${oembedData.thumbnail_url}`, _data: oembedData };
};

export const generateThumbnailUrl = async (
  url: string,
  id: string,
  platform: string
) => {
  if (platform === "youtube") {
    return generateYoutubeThumbnailUrl(id);
  }
  if (platform === "vimeo") {
    return await generateVimeoThumbnailUrl(id, url);
  }
};

export const getVideoInfo = async (url: string) => {
  const info = getVideoId(url);
  const string_ = sanitizeUrl(url);
  if (!info.id || !info.service) {
    return {
      ...info,
      thumbnail: null,
      sourceUrl: string_,
      _data: null,
    };
  }
  const tn = await generateThumbnailUrl(string_, info.id, info.service);
  return {
    ...info,
    thumbnail: tn?.thumbnail,
    sourceUrl: string_,
    _data: tn?._data,
  };
};
