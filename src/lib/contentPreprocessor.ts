// src/lib/contentPreprocessor.ts

export const preprocessContent = (content: any) => {
    try {
      console.log('Preprocessing content:', content);
      
      // Ensure content is an object
      const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
      
      const blocks = parsedContent.blocks;
      console.log('Total blocks:', blocks.length);
  
      const sections: Record<string, any[]> = {};
      let currentSection: string | null = null;
  
      blocks.forEach((block: { type: string; data: { text: string; }; }, index: any) => {
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
  
      // Construct cleanedContent with organized sections
      const cleanedContent = {
        time: parsedContent.time,
        blocks: [] as any[],
        version: parsedContent.version,
      };
  
      Object.keys(sections).forEach(section => {
        // Add header block
        cleanedContent.blocks.push({
          id: `header-${section}`,
          type: 'header',
          data: {
            text: section,
            level: 2,
          },
        });
  
        // Add paragraph blocks under the section
        sections[section].forEach((para, index) => {
          cleanedContent.blocks.push({
            id: `${section}-para-${index}`,
            type: 'paragraph',
            data: para.data,
          });
        });
      });
  
      console.log('Cleaned Content:', cleanedContent);
  
      return cleanedContent;
    } catch (error) {
      console.error('Error preprocessing content:', error);
      return {
        time: Date.now(),
        blocks: [],
        version: '2.27.0',
      };
    }
  };
  