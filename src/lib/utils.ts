import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

export const formatLeaderboardName = (name: string): string => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    // Divide by 1,000,000 and keep one decimal place
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'mil';
  } else if (num >= 10_000) {
    // Divide by 1,000 and round to nearest integer
    return Math.round(num / 1_000) + 'k';
  } else {
    // Return the number as is
    return num.toString();
  }
}


export function extractShortBio(content: any): string {
  if (content && Array.isArray(content.blocks)) {
    let isShortBioSection = false;
    let shortBio = [];

    for (const block of content.blocks) {
      // Check if the current block is the SHORTBIO header
      if (block.type === 'header' && block.data.text.trim() === '{SHORTBIO}') {
        isShortBioSection = true;
        continue; // Move to the next block to start collecting bio
      }

      // If another header is found and we are in the SHORTBIO section, stop collecting
      if (isShortBioSection && block.type === 'header') {
        break;
      }

      // If we're in the SHORTBIO section and the block is a paragraph, collect the text
      if (isShortBioSection && block.type === 'paragraph') {
        shortBio.push(block.data.text.trim());
      }
    }

    // Join all collected paragraphs into a single string separated by spaces
    return shortBio.join(' ');
  }

  return ''; // Return an empty string if SHORTBIO is not found
}
