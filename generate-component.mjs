#!/usr/bin/env node
/* eslint-disable no-undef */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .version('1.0.0')
  .description('CLI to generate React TypeScript component folder with template')
  .arguments('<componentName> [`parentFolder]')
  .action(async (componentName,parentFolder = '') => {
    await generateComponent(componentName,parentFolder);
  })
  .parse(process.argv);

  async function generateComponent(componentName, parentFolder) {
    try {


    let componentDir = path.join(__dirname, componentName);
    let parentFolderPath = ''

    
    if(parentFolder){
      parentFolderPath = path.join(__dirname, parentFolder);
      const parentFolderExists = await fs.stat(parentFolderPath).then(stat => stat.isDirectory()).catch(() => false);

      if (!parentFolderExists) {
        console.warn(`1. Parent folder '${parentFolder}' does not exist.`);
        await fs.mkdir(parentFolderPath);
        const arrPath = parentFolder.split('/')
        console.log(`2. Create Parent folder '${arrPath[arrPath.length - 1]}' successfully!.`);

      }
    }
    // Check if the parent folder exists
    
    // Check if the directory exists
    // const dirExists = await fs.stat(componentDir).then(stat => stat.isDirectory()).catch(() => false);

    // If the directory exists, remove it
    // if (dirExists) {
    //   await fs.rm(componentDir, { recursive: true });
    //   console.log(`Existing component directory '${componentName}' removed.`);
    // }
 
    // Create component directory
    if(parentFolderPath){
      componentDir = path.join(parentFolderPath, componentName);
    }
    await fs.mkdir(componentDir);
    
    // Read template file
    const templatePathCop = path.join(__dirname, 'templates', 'Component.tsx.ejs');
    const templatePathIndex = path.join(__dirname, 'templates', 'index.ts.ejs');
    const templateContentCop = await fs.readFile(templatePathCop, 'utf-8');
    const templateContentIndex = await fs.readFile(templatePathIndex, 'utf-8');

    // Render template with component name
    const renderedContentCop = ejs.render(templateContentCop, { componentName });
    // Render template with component name
    const renderedContentIndex = ejs.render(templateContentIndex, { componentName });

    // Write component file
    const componentFilePathCop = path.join(componentDir, `${componentName}.tsx`);
    await fs.writeFile(componentFilePathCop, renderedContentCop);

    // Write component file
    const componentFilePathIndex = path.join(componentDir, `index.ts`);
    await fs.writeFile(componentFilePathIndex, renderedContentIndex);

    console.log(`3. Component ${componentName} created successfully!`);
  } catch (error) {
    console.error('Error:', error);
  }
}
