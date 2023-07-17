const classNames = [
  "Sarna da macieira",
  "Macieira c/ podridão negra",
  "Macieira c/ ferrugem do cedro",
  "Macieira saudável",
  "Fundo sem folha",
  "Mirtilo saudável",
  "Cerejeira c/ oídio",
  "Cerejeira saudável",
  "Milho c/ mancha cinzenta",
  "Milho c/ ferrugem comum",
  "Milho c/ mancha foliar do norte",
  "Milho saudável",
  "Videira c/ podridão negra",
  "Videira c/ sarampo negro",
  "Videira c/ mancha foliar",
  "Videira saudável",
  "Laranjeira c/ Huanglongbing",
  "Pessegueiro c/ cancro bacteriano",
  "Pessegueiro saudável",
  "Pimentão c/ cancro bacteriano",
  "Pimentão saudável",
  "Batata c/ requeima precoce",
  "Batata c/ requeima tardia",
  "Batata saudável",
  "Framboesa saudável",
  "Soja saudável",
  "Abobrinha c/ oídio",
  "Morangueiro c/ queima de folhas",
  "Tomateiro c/ mancha bacteriana",
  "Tomateiro c/ requeima precoce",
  "Tomateiro c/ requeima tardia",
  "Tomateiro c/ mofo das folhas",
  "Tomateiro c/ mancha foliar de septoria",
  "Tomateiro c/ ácaro-rajado",
  "Tomateiro com mancha-alvo",
  "Tomateiro c/ vírus da ondulação...",
  "Tomateiro c/ vírus do mosaico",
  "Tomateiro saudável",
];

export const suggestions = [
  {
    item: "Sarna da macieira",
    suggestion: "Aplicar fungicida durante a estação chuvosa",
  },
  {
    item: "Macieira c/ podridão negra",
    suggestion: "Podar e destruir galhos infectados",
  },
  {
    item: "Macieira c/ ferrugem do cedro",
    suggestion: "Remover e destruir folhas infectadas",
  },
  {
    item: "Macieira saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Fundo sem folha",
    suggestion: "Não há praga para tratar, então sem sugestão",
  },
  {
    item: "Mirtilo saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Cerejeira c/ oídio",
    suggestion: "Aplicar fungicidas e aumentar a circulação de ar",
  },
  {
    item: "Cerejeira saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Milho c/ mancha cinzenta",
    suggestion:
      "Aplicar fungicidas recomendados e escolher variedades resistentes",
  },
  {
    item: "Milho c/ ferrugem comum",
    suggestion: "Aplicar fungicida e plantar variedades resistentes",
  },
  {
    item: "Milho c/ mancha foliar do norte",
    suggestion:
      "Melhorar a rotação de culturas e aplicar fungicidas quando necessário",
  },
  {
    item: "Milho saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Videira c/ podridão negra",
    suggestion: "Aplique fungicidas e remova frutas e folhas infectadas",
  },
  {
    item: "Videira c/ sarampo negro",
    suggestion: "Aplique fungicidas adequados e melhore a drenagem do solo",
  },
  {
    item: "Videira c/ mancha foliar",
    suggestion: "Aplicar fungicidas específicos e remover folhas infectadas",
  },
  {
    item: "Videira saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Laranjeira c/ Huanglongbing",
    suggestion:
      "Controlar vetores de insetos e remover e destruir árvores infectadas",
  },
  {
    item: "Pessegueiro c/ cancro bacteriano",
    suggestion:
      "Aplicar antibióticos durante o período úmido e podar e destruir galhos infectados",
  },
  {
    item: "Pessegueiro saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Pimentão c/ cancro bacteriano",
    suggestion: "Praticar a rotação de culturas e usar variedades resistentes",
  },
  {
    item: "Pimentão saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Batata c/ requeima precoce",
    suggestion:
      "Aplicar fungicidas específicos e evitar o molhamento excessivo",
  },
  {
    item: "Batata c/ requeima tardia",
    suggestion: "Usar variedades resistentes e aplicar fungicidas apropriados",
  },
  {
    item: "Batata saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Framboesa saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Soja saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
  {
    item: "Abobrinha c/ oídio",
    suggestion:
      "Aplicar fungicidas adequados e evitar o molhamento excessivo das folhas",
  },
  {
    item: "Morangueiro c/ queima de folhas",
    suggestion: "Praticar rotação de culturas e aplicar fungicidas adequados",
  },
  {
    item: "Tomateiro c/ mancha bacteriana",
    suggestion: "Use variedades resistentes e pratique a rotação de culturas",
  },
  {
    item: "Tomateiro c/ requeima precoce",
    suggestion: "Aplicar fungicidas e evitar molhar as folhas ao regar",
  },
  {
    item: "Tomateiro c/ requeima tardia",
    suggestion: "Aplicar fungicida e escolher variedades resistentes",
  },
  {
    item: "Tomateiro c/ mofo das folhas",
    suggestion: "Aplicar fungicida específico e aumentar a circulação de ar",
  },
  {
    item: "Tomateiro c/ mancha foliar de septoria",
    suggestion: "Aplicar fungicida e evitar molhar as folhas ao regar",
  },
  {
    item: "Tomateiro c/ ácaro-rajado",
    suggestion:
      "Usar inseticidas e liberar predadores naturais como a Phytoseiulus persimilis",
  },
  {
    item: "Tomateiro com mancha-alvo",
    suggestion:
      "Melhorar a rotação de culturas e aplicar fungicidas quando necessário",
  },
  {
    item: "Tomateiro c/ vírus da ondulação",
    suggestion: "Remover e destruir plantas infectadas",
  },
  {
    item: "Tomateiro c/ vírus do mosaico",
    suggestion: "Plantar variedades resistentes e remover plantas infectadas",
  },
  {
    item: "Tomateiro saudável",
    suggestion: "Continuar boas práticas de manejo e monitoramento",
  },
];
