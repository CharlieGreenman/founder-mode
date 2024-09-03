import * as fs from 'fs';
import * as path from 'path';

const chapterFiles = [
  "the-origins-of-founder-mode.md",
  "maintaining-the-vision.md",
  "direct-engagement.md",
  "role-of-culture-in-scaling.md",
  "balancing-vision-and-delegation.md",
  "innovative-practices-for-founders.md",
  "navigating-growth-challenges.md",
  "power-of-hands-on-leadership.md",
  "personal-retreats.md",
  "preserving-startup-agility.md",
  "flexibility-in-leadership.md",
  "founder-vs-manager-mode.md",
  "building-and-sustaining-culture.md",
  "transition-from-founder-to-ceo.md",
  "founder-role-in-crisis-management.md",
  "retaining-innovation.md",
  "scaling-without-losing-identity.md",
  "founder-mode-in-competition.md",
  "keeping-the-flame-alive.md",
  "autonomy-and-trust.md",
  "reimagining-org-structure.md",
  "emotional-side-of-foundership.md",
  "founder-mode-and-decision-making.md",
  "struggle-with-letting-go.md",
  "long-term-vision.md",
  "cultural-adaptation.md",
  "founder-mode-in-mature-orgs.md",
  "sustaining-personal-creativity.md",
  "founders-dilemma.md",
  "direct-employee-interaction.md",
  "founder-mode-in-industries.md",
  "why-founders-fail-to-scale.md",
  "maintaining-innovation-in-large-teams.md",
  "founder-led-product-development.md",
  "balancing-risk-and-stability.md",
  "founder-mode-and-customer-relations.md",
  "building-a-legacy.md",
  "managing-founder-fatigue.md",
  "empowering-your-team.md",
  "company-culture-evolution.md",
  "adapting-founder-mode-for-remote.md",
  "long-term-strategy.md",
  "storytelling-in-founder-mode.md",
  "revitalizing-company-culture.md",
  "founder-mode-and-ma.md",
  "succession-planning.md",
  "global-expansion.md",
  "transition-from-startup-to-scale-up.md",
  "founder-mode-and-investor-relations.md",
  "future-of-founder-mode.md"
];

const createChapterFiles = () => {
  chapterFiles.forEach((fileName, index) => {
    const chapterNumber = (index + 1).toString().padStart(2, '0');
    const content = `# Chapter ${chapterNumber}: ${fileName.replace(/-/g, ' ').replace('.md', '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}\n\n## Introduction\n\n[Write your introduction here]\n\n## Main Content\n\n[Write your main content here]\n\n## Conclusion\n\n[Write your conclusion here]`;
    
    fs.writeFileSync(path.join(__dirname, `${chapterNumber}-${fileName}`), content);
    console.log(`Created ${chapterNumber}-${fileName}`);
  });
};

createChapterFiles();
