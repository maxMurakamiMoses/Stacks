// src/lib/contentPreprocessor.ts

export interface PreprocessedContent {
  cleanedContent: {
    time: number;
    blocks: any[];
    version: string;
  };
  sections: Record<string, any[]>;
}

export const preprocessContent = (content: any): PreprocessedContent => {
  try {


    // Ensure content is an object
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

    const blocks = parsedContent.blocks;


    const sections: Record<string, any[]> = {};
    let currentSection: string | null = null;

    blocks.forEach((block: { type: string; data: { text: string } }, index: number) => {

      if (block.type.toLowerCase() === 'header' && block.data && typeof block.data.text === 'string') {
        // Extract section name by removing curly braces
        const sectionName = block.data.text.replace(/[{}]/g, '').trim().toUpperCase();
     
        currentSection = sectionName;
        sections[currentSection] = [];
      } else if (block.type.toLowerCase() === 'paragraph' && currentSection) {

        sections[currentSection].push(block);
      }
    });


    // Define sections to extract
    const sectionsToExtract = ['BIO', 'SHORTBIO', 'TAGS', 'DIET', 'APPSSTACK', 'VITAMINSTACKS', 'HABIT STACK'];

    // Extract specified sections and remove them from the original blocks
    const blocksToRemove = new Set();
    sectionsToExtract.forEach((section) => {
      if (sections[section]) {
        // Mark these blocks for removal
        sections[section].forEach((block) => {
          blocksToRemove.add(block);
        });
      }
    });

    // Filter out the blocks to remove
    const cleanedBlocks = blocks.filter((block) => !blocksToRemove.has(block));

    // Construct cleanedContent without the extracted sections
    const cleanedContent = {
      time: parsedContent.time,
      blocks: cleanedBlocks, // Remaining blocks after extraction
      version: parsedContent.version,
    };



    return { cleanedContent, sections };
  } catch (error) {
    console.error('Error preprocessing content:', error);
    return {
      cleanedContent: {
        time: Date.now(),
        blocks: [],
        version: '2.27.0',
      },
      sections: {},
    };
  }
};
