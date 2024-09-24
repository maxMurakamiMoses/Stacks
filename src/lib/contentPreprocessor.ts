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
    console.log('Preprocessing content:', content);
    
    // Ensure content is an object
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    
    const blocks = parsedContent.blocks;
    console.log('Total blocks:', blocks.length);

    const sections: Record<string, any[]> = {};
    let currentSection: string | null = null;

    blocks.forEach((block: { type: string; data: { text: string; }; }, index: number) => {
      console.log(`Processing block ${index}:`, block);
      if (block.type.toLowerCase() === 'header' && block.data && typeof block.data.text === 'string') {
        // Extract section name by removing curly braces
        const sectionName = block.data.text.replace(/[{}]/g, '').trim();
        console.log(`Found section header: "${sectionName}"`);
        currentSection = sectionName;
        sections[currentSection] = [];
      } else if (block.type.toLowerCase() === 'paragraph' && currentSection) {
        console.log(`Adding paragraph to section "${currentSection}":`, block);
        sections[currentSection].push(block);
      }
    });

    console.log('Sections after processing:', sections);

    // Define sections to extract
    const sectionsToExtract = ['BIO', 'SHORTBIO', 'TAGS'];

    // Extract specified sections and remove them from the original blocks
    sectionsToExtract.forEach(section => {
      if (sections[section]) {
        // Remove these blocks from the original content
        sections[section].forEach(block => {
          const index = blocks.findIndex(
            b => b.id === block.id && b.type === block.type && b.data.text === block.data.text
          );
          if (index !== -1) {
            blocks.splice(index, 1);
          }
        });
      }
    });

    // Construct cleanedContent without the extracted sections
    const cleanedContent = {
      time: parsedContent.time,
      blocks: blocks, // Remaining blocks after extraction
      version: parsedContent.version,
    };

    console.log('Cleaned Content (without extracted sections):', cleanedContent);
    console.log('Extracted Sections:', sections);

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
