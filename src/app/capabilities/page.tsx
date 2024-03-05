"use client";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

function understandingText(level: number) {
    switch (level) {
        case 1:
            return '1: Remember'
        case 2:
            return '2: Understand'
        case 3:
            return '3: Apply'
        case 4:
            return '4: Analyse'
        case 5:
            return '5: Evaluate'
        default:
            return `${level}': Unknown'`
    }
}

function informationText(level: number) {
    switch (level) {
        case 1:
            return '1: Incidental'
        case 2:
            return '2: Owned '
        case 3:
            return '3: Correlated'
        case 4:
            return '4: Structured'
        case 5:
            return '5: Behaviour Changing'
        default:
            return `${level}': Unknown'`
    }
}

function opportunityText(level: number) {
    switch (level) {
        case 1:
            return '1: Ad-hoc'
        case 2:
            return '2: Reactive'
        case 3:
            return '3: Scheduled'
        case 4:
            return '4: Proactive'
        case 5:
            return '5: Low-impact'
        default:
            return `${level}': Unknown'`
    }
}
  
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import React from 'react'

type Capability = {
    id: string
    name: string
    definition: string
    area: string
    mappings: Mapping[]
}

const capabilityData: Capability[] = [
        {
            id: "PSCF-RM-OOM",
            name: "Organisational Operating Model",
            definition: "evaluate and apply fair and scalable accountabilities and reponsibilities for capabilities across the delivery organisation",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-CCI",
            name: "Continuous Capability Improvement",
            definition: "evaluate capabilities in this framework that require improvement and apply improvements over time",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-TPC",
            name: "Third-Party Components",
            definition: "evaluate and select third-party component suppliers",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-TPD",
            name: "Third-Party Software Development Services",
            definition: "evaluate and select secure third-party development services suppliers",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-TPS",
            name: "Third-Party Software-as-a-Service",
            definition: "evaluate and select secure SaaS offerings from third parties",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-CO",
            name: "Compliance Obligations",
            definition: "define, understand and apply your obligations for compliance to your product delivery process",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-DPO",
            name: "Data Processing Obligations",
            definition: "define, understand and apply your obligations for data processing to your product delivery process",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-BIA",
            name: "Business Impact Assessment",
            definition: "analyse the business value of products and the effects security disruptions to that product will have on business",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-DIA",
            name: "Data Protection Impact Assessment",
            definition: "analyse the potential impact to the data subject that a failure of data protection would have",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-RM-TI",
            name: "Threat Intelligence",
            definition: "define and understand criminal abuses your product might be exposed to and apply this understanding to product delivery",
            area: "Risk Management",
            mappings: []
        },
        {
            id: "PSCF-SPM-RC",
            name: "Recommended Components",
            definition: "evaluate and select secure recommended components suitable for use in the organisation's products",
            area: "Secure Product Management",
            mappings: []
        },
        {
            id: "PSCF-SPM-RSS",
            name: "Recommended Shared Security Services",
            definition: "evaluate and select shared security services suitable for use in the organisation's products",
            area: "Secure Product Management",
            mappings: []
        },
        {
            id: "PSCF-SPM-DM",
            name: "Delivery Metrics",
            definition: "quantitatively evaluate the efficiency of delivery capabilities",
            area: "Secure Product Management",
            mappings: []
        },
        {
            id: "PSCF-SPM-QM",
            name: "Quality Metrics",
            definition: "quantitatively evaluate all aspects of your product's quality",
            area: "Secure Product Management",
            mappings: []
        },
        {
            id: "PSCF-SPM-POM",
            name: "Product Operating Model",
            definition: "analyse your products and define their scope, processes and operating requirements across their lifecycle",
            area: "Secure Product Management",
            mappings: []
        },
        {
            id: "PSCF-SPM-MAR",
            name: "Minimum Application Requirements For Security",
            definition: "evaluate and select a list of minimum security requirements suitable for use in the organisation's products",
            area: "Secure Product Management",
            mappings: []
        },
        {
            id: "PSCF-SPI-DC",
            name: "Data Classification",
            definition: "maintain a Data Catalogue of data in use by your product that records its criticality, sensitivity and requirement",
            area: "Secure Product Implementation",
            mappings: []
        },
        {
            id: "PSCF-SPI-FRA",
            name: "Functional Requirement Analysis",
            definition: "analyse functional product requirements for security requirements arising",
            area: "Secure Product Implementation",
            mappings: []
        },
        {
            id: "PSCF-SPI-ATM",
            name: "Agile Threat Modelling",
            definition: "evaluate product designs for their resilience to security threats ",
            area: "Secure Product Implementation",
            mappings: []
        },
        {
            id: "PSCF-SPI-CM",
            name: "Component Management",
            definition: "evaluate, select and maintain secure product components used by your product",
            area: "Secure Product Implementation",
            mappings: []
        },
        {
            id: "PSCF-SPI-SCP",
            name: "Secure Coding Practices",
            definition: "define, understand and apply secure coding practices to the creation of source code for use in the organisation's products",
            area: "Secure Product Implementation",
            mappings: []
        },
        {
            id: "PSCF-SBD-DM",
            name: "Dependency Management",
            definition: "evaluate and select secure software dependencies used by your product",
            area: "Secure Build And Deployment",
            mappings: []
        },
        {
            id: "PSCF-SBD-BP",
            name: "Build Process",
            definition: "securely assemble product artefacts from their codebases and dependencies",
            area: "Secure Build And Deployment",
            mappings: []
        },
        {
            id: "PSCF-SBD-AI",
            name: "Artifact Integrity",
            definition: "use product artefacts from trusted sources and evaluate any that change",
            area: "Secure Build And Deployment",
            mappings: []
        },
        {
            id: "PSCF-SBD-DI",
            name: "Data Integrity",
            definition: "use data in your product that is obtained from and stored in trusted sources and evaluate any changes",
            area: "Secure Build And Deployment",
            mappings: []
        },
        {
            id: "PSCF-SBD-SM",
            name: "Secrets Management",
            definition: "restrict access to product secrets to only when required by those people and systems that need them",
            area: "Secure Build And Deployment",
            mappings: []
        },
        {
            id: "PSCF-SBD-DP",
            name: "Deployment Process",
            definition: "securely deploy a product and its components from a known set of artefacts",
            area: "Secure Build And Deployment",
            mappings: []
        },
        {
            id: "PSCF-QC-CST",
            name: "Component Security Testing",
            definition: "analyse products for security issues in source code and included libraries",
            area: "Quality Control",
            mappings: []
        },
        {
            id: "PSCF-QC-EST",
            name: "Exploratory Security Testing",
            definition: "analyse products for security issues in running systems",
            area: "Quality Control",
            mappings: []
        },
        {
            id: "PSCF-QC-SDM",
            name: "Security Defect Management",
            definition: "evaluate findings from security checks through to resolution",
            area: "Quality Control",
            mappings: []
        },
        {
            id: "PSCF-OV-EM",
            name: "Environment Management",
            definition: "apply secure system configurations and evaluate any that change",
            area: "Operational Visibility",
            mappings: []
        },
        {
            id: "PSCF-OV-ID",
            name: "Incident Detection",
            definition: "analyse product events and evaluate them for those that indicate a security incident",
            area: "Operational Visibility",
            mappings: []
        },
        {
            id: "PSCF-OV-IR",
            name: "Incident Response",
            definition: "apply appropriate responses to identified security incidents",
            area: "Operational Visibility",
            mappings: []
        }
    ]

    type Mapping = {
        id: string
        description: string
        pscfIds: string
        understanding: number
        information: number
        opportunity: number
    }


    const gdprData: Mapping[] = [
        {
            "id": "5.1.a",
            "description": "Principals: Principles relating to processing of personal data - Personal data shall be: processed lawfully, fairly and in a transparent manner in relation to the data subject (‘lawfulness, fairness and transparency’);",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "5.1.b",
            "description": "Principals: Principles relating to processing of personal data - Personal data shall be: collected for specified, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes; further processing for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes shall, in accordance with Article 89(1), not be considered to be incompatible with the initial purposes (‘purpose limitation’);",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "5.1.c",
            "description": "Principals: Principles relating to processing of personal data - Personal data shall be: adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed (‘data minimisation’);",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "5.1.d",
            "description": "Principals: Principles relating to processing of personal data - Personal data shall be: accurate and, where necessary, kept up to date; every reasonable step must be taken to ensure that personal data that are inaccurate, having regard to the purposes for which they are processed, are erased or rectified without delay (‘accuracy’);",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "5.1.e",
            "description": "Principals: Principles relating to processing of personal data - Personal data shall be: kept in a form which permits identification of data subjects for no longer than is necessary for the purposes for which the personal data are processed; personal data may be stored for longer periods insofar as the personal data will be processed solely for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes in accordance with Article 89(1) subject to implementation of the appropriate technical and organisational measures required by this Regulation in order to safeguard the rights and freedoms of the data subject (‘storage limitation’);",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "5.1.f",
            "description": "Principals: Principles relating to processing of personal data - Personal data shall be: processed in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures (‘integrity and confidentiality’).",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "5.2",
            "description": "Principals: Principles relating to processing of personal data - The controller shall be responsible for, and be able to demonstrate compliance with, paragraph 1 (‘accountability’). ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "6.1.a",
            "description": "Principals: Lawfulness of processing - Processing shall be lawful only if and to the extent that at least one of the following applies: the data subject has given consent to the processing of his or her personal data for one or more specific purposes;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "6.1.b",
            "description": "Principals: Lawfulness of processing - Processing shall be lawful only if and to the extent that at least one of the following applies: processing is necessary for the performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "6.1.c",
            "description": "Principals: Lawfulness of processing - Processing shall be lawful only if and to the extent that at least one of the following applies: processing is necessary for compliance with a legal obligation to which the controller is subject;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "6.1.d",
            "description": "Principals: Lawfulness of processing - Processing shall be lawful only if and to the extent that at least one of the following applies: processing is necessary in order to protect the vital interests of the data subject or of another natural person;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "6.1.e",
            "description": "Principals: Lawfulness of processing - Processing shall be lawful only if and to the extent that at least one of the following applies: processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "6.1.f",
            "description": "Principals: Lawfulness of processing - Processing shall be lawful only if and to the extent that at least one of the following applies: processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data, in particular where the data subject is a child.\n\nPoint (f) of the first subparagraph shall not apply to processing carried out by public authorities in the performance of their tasks.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "7.1",
            "description": "Principals: Conditions for consent - Where processing is based on consent, the controller shall be able to demonstrate that the data subject has consented to processing of his or her personal data. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "7.2",
            "description": "Principals: Conditions for consent - If the data subject’s consent is given in the context of a written declaration which also concerns other matters, the request for consent shall be presented in a manner which is clearly distinguishable from the other matters, in an intelligible and easily accessible form, using clear and plain language. Any part of such a declaration which constitutes an infringement of this Regulation shall not be binding. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "7.3",
            "description": "Principals: Conditions for consent - The data subject shall have the right to withdraw his or her consent at any time. The withdrawal of consent shall not affect the lawfulness of processing based on consent before its withdrawal. Prior to giving consent, the data subject shall be informed thereof. It shall be as easy to withdraw as to give consent. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "7.4",
            "description": "Principals: Conditions for consent - When assessing whether consent is freely given, utmost account shall be taken of whether, inter alia, the performance of a contract, including the provision of a service, is conditional on consent to the processing of personal data that is not necessary for the performance of that contract. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "8.1",
            "description": "Principals: Conditions applicable to child's consent in relation to information society services - Where point (a) of Article 6(1) applies, in relation to the offer of information society services directly to a child, the processing of the personal data of a child shall be lawful where the child is at least 16 years old. Where the child is below the age of 16 years, such processing shall be lawful only if and to the extent that consent is given or authorised by the holder of parental responsibility over the child. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "8.2",
            "description": "Principals: Conditions applicable to child's consent in relation to information society services - Member States may provide by law for a lower age for those purposes provided that such lower age is not below 13 years. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "8.3",
            "description": "Principals: Conditions applicable to child's consent in relation to information society services - The controller shall make reasonable efforts to verify in such cases that consent is given or authorised by the holder of parental responsibility over the child, taking into consideration available technology. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "8.4",
            "description": "Principals: Conditions applicable to child's consent in relation to information society services - Paragraph 1 shall not affect the general contract law of Member States such as the rules on the validity, formation or effect of a contract in relation to a child. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.1",
            "description": "Principals: Processing of special categories of personal data - Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person’s sex life or sexual orientation shall be prohibited. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.a",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: the data subject has given explicit consent to the processing of those personal data for one or more specified purposes, except where Union or Member State law provide that the prohibition referred to in paragraph 1 may not be lifted by the data subject;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.b",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing is necessary for the purposes of carrying out the obligations and exercising specific rights of the controller or of the data subject in the field of employment and social security and social protection law in so far as it is authorised by Union or Member State law or a collective agreement pursuant to Member State law providing for appropriate safeguards for the fundamental rights and the interests of the data subject;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.c",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing is necessary to protect the vital interests of the data subject or of another natural person where the data subject is physically or legally incapable of giving consent;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.d",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing is carried out in the course of its legitimate activities with appropriate safeguards by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim and on condition that the processing relates solely to the members or to former members of the body or to persons who have regular contact with it in connection with its purposes and that the personal data are not disclosed outside that body without the consent of the data subjects;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.e",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing relates to personal data which are manifestly made public by the data subject;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.f",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing is necessary for the establishment, exercise or defence of legal claims or whenever courts are acting in their judicial capacity;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.g",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing is necessary for reasons of substantial public interest, on the basis of Union or Member State law which shall be proportionate to the aim pursued, respect the essence of the right to data protection and provide for suitable and specific measures to safeguard the fundamental rights and the interests of the data subject;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.h",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing is necessary for the purposes of preventive or occupational medicine, for the assessment of the working capacity of the employee, medical diagnosis, the provision of health or social care or treatment or the management of health or social care systems and services on the basis of Union or Member State law or pursuant to contract with a health professional and subject to the conditions and safeguards referred to in paragraph 3;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.i",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing is necessary for reasons of public interest in the area of public health, such as protecting against serious cross-border threats to health or ensuring high standards of quality and safety of health care and of medicinal products or medical devices, on the basis of Union or Member State law which provides for suitable and specific measures to safeguard the rights and freedoms of the data subject, in particular professional secrecy;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.2.j",
            "description": "Principals: Processing of special categories of personal data - Paragraph 1 shall not apply if one of the following applies: processing is necessary for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes in accordance with Article 89(1) based on Union or Member State law which shall be proportionate to the aim pursued, respect the essence of the right to data protection and provide for suitable and specific measures to safeguard the fundamental rights and the interests of the data subject.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.3",
            "description": "Principals: Processing of special categories of personal data - Personal data referred to in paragraph 1 may be processed for the purposes referred to in point (h) of paragraph 2 when those data are processed by or under the responsibility of a professional subject to the obligation of professional secrecy under Union or Member State law or rules established by national competent bodies or by another person also subject to an obligation of secrecy under Union or Member State law or rules established by national competent bodies. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "9.4",
            "description": "Principals: Processing of special categories of personal data - Member States may maintain or introduce further conditions, including limitations, with regard to the processing of genetic data, biometric data or data concerning health. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "10",
            "description": "Principals: Processing of personal data relating to criminal convictions and offences - Processing of personal data relating to criminal convictions and offences or related security measures based on Article 6(1) shall be carried out only under the control of official authority or when the processing is authorised by Union or Member State law providing for appropriate safeguards for the rights and freedoms of data subjects. Any comprehensive register of criminal convictions shall be kept only under the control of official authority. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "11.1",
            "description": "Principals: Processing which does not require identification - If the purposes for which a controller processes personal data do not or do no longer require the identification of a data subject by the controller, the controller shall not be obliged to maintain, acquire or process additional information in order to identify the data subject for the sole purpose of complying with this Regulation. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "11.2",
            "description": "Principals: Processing which does not require identification - Where, in cases referred to in paragraph 1 of this Article, the controller is able to demonstrate that it is not in a position to identify the data subject, the controller shall inform the data subject accordingly, if possible. In such cases, Articles 15 to 20 shall not apply except where the data subject, for the purpose of exercising his or her rights under those articles, provides additional information enabling his or her identification. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.1",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - The controller shall take appropriate measures to provide any information referred to in Articles 13 and 14 and any communication under Articles 15 to 22 and 34 relating to processing to the data subject in a concise, transparent, intelligible and easily accessible form, using clear and plain language, in particular for any information addressed specifically to a child. The information shall be provided in writing, or by other means, including, where appropriate, by electronic means. When requested by the data subject, the information may be provided orally, provided that the identity of the data subject is proven by other means. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.2",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - The controller shall facilitate the exercise of data subject rights under Articles 15 to 22. In the cases referred to in Article 11(2), the controller shall not refuse to act on the request of the data subject for exercising his or her rights under Articles 15 to 22, unless the controller demonstrates that it is not in a position to identify the data subject. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.3",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - The controller shall provide information on action taken on a request under Articles 15 to 22 to the data subject without undue delay and in any event within one month of receipt of the request. That period may be extended by two further months where necessary, taking into account the complexity and number of the requests. The controller shall inform the data subject of any such extension within one month of receipt of the request, together with the reasons for the delay. Where the data subject makes the request by electronic form means, the information shall be provided by electronic means where possible, unless otherwise requested by the data subject. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.4",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - If the controller does not take action on the request of the data subject, the controller shall inform the data subject without delay and at the latest within one month of receipt of the request of the reasons for not taking action and on the possibility of lodging a complaint with a supervisory authority and seeking a judicial remedy. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.5.a",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - Information provided under Articles 13 and 14 and any communication and any actions taken under Articles 15 to 22 and 34 shall be provided free of charge. Where requests from a data subject are manifestly unfounded or excessive, in particular because of their repetitive character, the controller may either: charge a reasonable fee taking into account the administrative costs of providing the information or communication or taking the action requested; or",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.5.b",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - Information provided under Articles 13 and 14 and any communication and any actions taken under Articles 15 to 22 and 34 shall be provided free of charge. Where requests from a data subject are manifestly unfounded or excessive, in particular because of their repetitive character, the controller may either: refuse to act on the request.\n\nThe controller shall bear the burden of demonstrating the manifestly unfounded or excessive character of the request.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.6",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - Without prejudice to Article 11, where the controller has reasonable doubts concerning the identity of the natural person making the request referred to in Articles 15 to 21, the controller may request the provision of additional information necessary to confirm the identity of the data subject. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.7",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - The information to be provided to data subjects pursuant to Articles 13 and 14 may be provided in combination with standardised icons in order to give in an easily visible, intelligible and clearly legible manner a meaningful overview of the intended processing. Where the icons are presented electronically they shall be machine-readable. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "12.8",
            "description": "Rights of the data subject: Transparent information, communication and modalities for the exercise of the rights of the data subject - The Commission shall be empowered to adopt delegated acts in accordance with Article 92 for the purpose of determining the information to be presented by the icons and the procedures for providing standardised icons. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.1.a",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - Where personal data relating to a data subject are collected from the data subject, the controller shall, at the time when personal data are obtained, provide the data subject with all of the following information: the identity and the contact details of the controller and, where applicable, of the controller’s representative;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.1.b",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - Where personal data relating to a data subject are collected from the data subject, the controller shall, at the time when personal data are obtained, provide the data subject with all of the following information: the contact details of the data protection officer, where applicable;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.1.c",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - Where personal data relating to a data subject are collected from the data subject, the controller shall, at the time when personal data are obtained, provide the data subject with all of the following information: the purposes of the processing for which the personal data are intended as well as the legal basis for the processing;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.1.d",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - Where personal data relating to a data subject are collected from the data subject, the controller shall, at the time when personal data are obtained, provide the data subject with all of the following information: where the processing is based on point (f) of Article 6(1), the legitimate interests pursued by the controller or by a third party;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.1.e",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - Where personal data relating to a data subject are collected from the data subject, the controller shall, at the time when personal data are obtained, provide the data subject with all of the following information: the recipients or categories of recipients of the personal data, if any;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.1.f",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - Where personal data relating to a data subject are collected from the data subject, the controller shall, at the time when personal data are obtained, provide the data subject with all of the following information: where applicable, the fact that the controller intends to transfer personal data to a third country or international organisation and the existence or absence of an adequacy decision by the Commission, or in the case of transfers referred to in Article 46 or 47, or the second subparagraph of Article 49(1), reference to the appropriate or suitable safeguards and the means by which to obtain a copy of them or where they have been made available.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.2.a",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - In addition to the information referred to in paragraph 1, the controller shall, at the time when personal data are obtained, provide the data subject with the following further information necessary to ensure fair and transparent processing: the period for which the personal data will be stored, or if that is not possible, the criteria used to determine that period;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.2.b",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - In addition to the information referred to in paragraph 1, the controller shall, at the time when personal data are obtained, provide the data subject with the following further information necessary to ensure fair and transparent processing: the existence of the right to request from the controller access to and rectification or erasure of personal data or restriction of processing concerning the data subject or to object to processing as well as the right to data portability;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.2.c",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - In addition to the information referred to in paragraph 1, the controller shall, at the time when personal data are obtained, provide the data subject with the following further information necessary to ensure fair and transparent processing: where the processing is based on point (a) of Article 6(1) or point (a) of Article 9(2), the existence of the right to withdraw consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.2.d",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - In addition to the information referred to in paragraph 1, the controller shall, at the time when personal data are obtained, provide the data subject with the following further information necessary to ensure fair and transparent processing: the right to lodge a complaint with a supervisory authority;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.2.e",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - In addition to the information referred to in paragraph 1, the controller shall, at the time when personal data are obtained, provide the data subject with the following further information necessary to ensure fair and transparent processing: whether the provision of personal data is a statutory or contractual requirement, or a requirement necessary to enter into a contract, as well as whether the data subject is obliged to provide the personal data and of the possible consequences of failure to provide such data;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.2.f",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - In addition to the information referred to in paragraph 1, the controller shall, at the time when personal data are obtained, provide the data subject with the following further information necessary to ensure fair and transparent processing: the existence of automated decision-making, including profiling, referred to in Article 22(1) and (4) and, at least in those cases, meaningful information about the logic involved, as well as the significance and the envisaged consequences of such processing for the data subject.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.3",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - Where the controller intends to further process the personal data for a purpose other than that for which the personal data were collected, the controller shall provide the data subject prior to that further processing with information on that other purpose and with any relevant further information as referred to in paragraph 2. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "13.4",
            "description": "Rights of the data subject: Information to be provided where personal data are collected from the data subject - Paragraphs 1, 2 and 3 shall not apply where and insofar as the data subject already has the information. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.1.a",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Where personal data have not been obtained from the data subject, the controller shall provide the data subject with the following information: the identity and the contact details of the controller and, where applicable, of the controller’s representative;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.1.b",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Where personal data have not been obtained from the data subject, the controller shall provide the data subject with the following information: the contact details of the data protection officer, where applicable;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.1.c",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Where personal data have not been obtained from the data subject, the controller shall provide the data subject with the following information: the purposes of the processing for which the personal data are intended as well as the legal basis for the processing;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.1.d",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Where personal data have not been obtained from the data subject, the controller shall provide the data subject with the following information: the categories of personal data concerned;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.1.e",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Where personal data have not been obtained from the data subject, the controller shall provide the data subject with the following information: the recipients or categories of recipients of the personal data, if any;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.1.f",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Where personal data have not been obtained from the data subject, the controller shall provide the data subject with the following information: where applicable, that the controller intends to transfer personal data to a recipient in a third country or international organisation and the existence or absence of an adequacy decision by the Commission, or in the case of transfers referred to in Article 46 or 47, or the second subparagraph of Article 49(1), reference to the appropriate or suitable safeguards and the means to obtain a copy of them or where they have been made available.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.2.a",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: the period for which the personal data will be stored, or if that is not possible, the criteria used to determine that period;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.2.b",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: where the processing is based on point (f) of Article 6(1), the legitimate interests pursued by the controller or by a third party;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.2.c",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: the existence of the right to request from the controller access to and rectification or erasure of personal data or restriction of processing concerning the data subject and to object to processing as well as the right to data portability;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.2.d",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: where processing is based on point (a) of Article 6(1) or point (a) of Article 9(2), the existence of the right to withdraw consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.2.e",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: the right to lodge a complaint with a supervisory authority;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.2.f",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: from which source the personal data originate, and if applicable, whether it came from publicly accessible sources;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.2.g",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - In addition to the information referred to in paragraph 1, the controller shall provide the data subject with the following information necessary to ensure fair and transparent processing in respect of the data subject: the existence of automated decision-making, including profiling, referred to in Article 22(1) and (4) and, at least in those cases, meaningful information about the logic involved, as well as the significance and the envisaged consequences of such processing for the data subject.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.3.a",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - The controller shall provide the information referred to in paragraphs 1 and 2: within a reasonable period after obtaining the personal data, but at the latest within one month, having regard to the specific circumstances in which the personal data are processed;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.3.b",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - The controller shall provide the information referred to in paragraphs 1 and 2: if the personal data are to be used for communication with the data subject, at the latest at the time of the first communication to that data subject; or",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.3.c",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - The controller shall provide the information referred to in paragraphs 1 and 2: if a disclosure to another recipient is envisaged, at the latest when the personal data are first disclosed.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.4",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Where the controller intends to further process the personal data for a purpose other than that for which the personal data were obtained, the controller shall provide the data subject prior to that further processing with information on that other purpose and with any relevant further information as referred to in paragraph 2. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.5.a",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Paragraphs 1 to 4 shall not apply where and insofar as: the data subject already has the information;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.5.b",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Paragraphs 1 to 4 shall not apply where and insofar as: the provision of such information proves impossible or would involve a disproportionate effort, in particular for processing for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes, subject to the conditions and safeguards referred to in Article 89(1) or in so far as the obligation referred to in paragraph 1 of this Article is likely to render impossible or seriously impair the achievement of the objectives of that processing. In such cases the controller shall take appropriate measures to protect the data subject’s rights and freedoms and legitimate interests, including making the information publicly available;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.5.c",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Paragraphs 1 to 4 shall not apply where and insofar as: obtaining or disclosure is expressly laid down by Union or Member State law to which the controller is subject and which provides appropriate measures to protect the data subject’s legitimate interests; or",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "14.5.d",
            "description": "Rights of the data subject: Information to be provided where personal data have not been obtained from the data subject - Paragraphs 1 to 4 shall not apply where and insofar as: where the personal data must remain confidential subject to an obligation of professional secrecy regulated by Union or Member State law, including a statutory obligation of secrecy.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.1.a",
            "description": "Rights of the data subject: Right of access by the data subject - The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: the purposes of the processing;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.1.b",
            "description": "Rights of the data subject: Right of access by the data subject - The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: the categories of personal data concerned;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.1.c",
            "description": "Rights of the data subject: Right of access by the data subject - The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: the recipients or categories of recipient to whom the personal data have been or will be disclosed, in particular recipients in third countries or international organisations;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.1.d",
            "description": "Rights of the data subject: Right of access by the data subject - The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: where possible, the envisaged period for which the personal data will be stored, or, if not possible, the criteria used to determine that period;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.1.e",
            "description": "Rights of the data subject: Right of access by the data subject - The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: the existence of the right to request from the controller rectification or erasure of personal data or restriction of processing of personal data concerning the data subject or to object to such processing;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.1.f",
            "description": "Rights of the data subject: Right of access by the data subject - The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: the right to lodge a complaint with a supervisory authority;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.1.g",
            "description": "Rights of the data subject: Right of access by the data subject - The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: where the personal data are not collected from the data subject, any available information as to their source;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.1.h",
            "description": "Rights of the data subject: Right of access by the data subject - The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and, where that is the case, access to the personal data and the following information: the existence of automated decision-making, including profiling, referred to in Article 22(1) and (4) and, at least in those cases, meaningful information about the logic involved, as well as the significance and the envisaged consequences of such processing for the data subject.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.2",
            "description": "Rights of the data subject: Right of access by the data subject - Where personal data are transferred to a third country or to an international organisation, the data subject shall have the right to be informed of the appropriate safeguards pursuant to Article 46 relating to the transfer. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.3",
            "description": "Rights of the data subject: Right of access by the data subject - 1The controller shall provide a copy of the personal data undergoing processing. 2For any further copies requested by the data subject, the controller may charge a reasonable fee based on administrative costs. 3Where the data subject makes the request by electronic means, and unless otherwise requested by the data subject, the information shall be provided in a commonly used electronic form. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "15.4",
            "description": "Rights of the data subject: Right of access by the data subject - The right to obtain a copy referred to in paragraph 3 shall not adversely affect the rights and freedoms of others. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "16",
            "description": "Rights of the data subject: Right to rectification - The data subject shall have the right to obtain from the controller without undue delay the rectification of inaccurate personal data concerning him or her. 2Taking into account the purposes of the processing, the data subject shall have the right to have incomplete personal data completed, including by means of providing a supplementary statement. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.1.a",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies: the personal data are no longer necessary in relation to the purposes for which they were collected or otherwise processed;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.1.b",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies: the data subject withdraws consent on which the processing is based according to point (a) of Article 6(1), or point (a) of Article 9(2), and where there is no other legal ground for the processing;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.1.c",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies: the data subject objects to the processing pursuant to Article 21(1) and there are no overriding legitimate grounds for the processing, or the data subject objects to the processing pursuant to Article 21(2);",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.1.d",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies: the personal data have been unlawfully processed;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.1.e",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies: the personal data have to be erased for compliance with a legal obligation in Union or Member State law to which the controller is subject;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.1.f",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies: the personal data have been collected in relation to the offer of information society services referred to in Article 8(1).",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.2",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - Where the controller has made the personal data public and is obliged pursuant to paragraph 1 to erase the personal data, the controller, taking account of available technology and the cost of implementation, shall take reasonable steps, including technical measures, to inform controllers which are processing the personal data that the data subject has requested the erasure by such controllers of any links to, or copy or replication of, those personal data. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.3.a",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - Paragraphs 1 and 2 shall not apply to the extent that processing is necessary: for exercising the right of freedom of expression and information;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.3.b",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - Paragraphs 1 and 2 shall not apply to the extent that processing is necessary: for compliance with a legal obligation which requires processing by Union or Member State law to which the controller is subject or for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.3.c",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - Paragraphs 1 and 2 shall not apply to the extent that processing is necessary: for reasons of public interest in the area of public health in accordance with points (h) and (i) of Article 9(2) as well as Article 9(3);",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.3.d",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - Paragraphs 1 and 2 shall not apply to the extent that processing is necessary: for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes in accordance with Article 89(1) in so far as the right referred to in paragraph 1 is likely to render impossible or seriously impair the achievement of the objectives of that processing; or",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "17.3.e",
            "description": "Rights of the data subject: Right to erasure (‘right to be forgotten’) - Paragraphs 1 and 2 shall not apply to the extent that processing is necessary: for the establishment, exercise or defence of legal claims.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "18.1.a",
            "description": "Rights of the data subject: Right to restriction of processing - The data subject shall have the right to obtain from the controller restriction of processing where one of the following applies: the accuracy of the personal data is contested by the data subject, for a period enabling the controller to verify the accuracy of the personal data;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "18.1.b",
            "description": "Rights of the data subject: Right to restriction of processing - The data subject shall have the right to obtain from the controller restriction of processing where one of the following applies: the processing is unlawful and the data subject opposes the erasure of the personal data and requests the restriction of their use instead;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "18.1.c",
            "description": "Rights of the data subject: Right to restriction of processing - The data subject shall have the right to obtain from the controller restriction of processing where one of the following applies: the controller no longer needs the personal data for the purposes of the processing, but they are required by the data subject for the establishment, exercise or defence of legal claims;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "18.1.d",
            "description": "Rights of the data subject: Right to restriction of processing - The data subject shall have the right to obtain from the controller restriction of processing where one of the following applies: the data subject has objected to processing pursuant to Article 21(1) pending the verification whether the legitimate grounds of the controller override those of the data subject.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "18.2",
            "description": "Rights of the data subject: Right to restriction of processing - Where processing has been restricted under paragraph 1, such personal data shall, with the exception of storage, only be processed with the data subject’s consent or for the establishment, exercise or defence of legal claims or for the protection of the rights of another natural or legal person or for reasons of important public interest of the Union or of a Member State. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "18.3",
            "description": "Rights of the data subject: Right to restriction of processing - A data subject who has obtained restriction of processing pursuant to paragraph 1 shall be informed by the controller before the restriction of processing is lifted. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "19",
            "description": "Rights of the data subject: Notification obligation regarding rectification or erasure of personal data or restriction of processing - The controller shall communicate any rectification or erasure of personal data or restriction of processing carried out in accordance with Article 16, Article 17(1) and Article 18 to each recipient to whom the personal data have been disclosed, unless this proves impossible or involves disproportionate effort. 2The controller shall inform the data subject about those recipients if the data subject requests it. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "20.1.a",
            "description": "Rights of the data subject: Right to data portability - The data subject shall have the right to receive the personal data concerning him or her, which he or she has provided to a controller, in a structured, commonly used and machine-readable format and have the right to transmit those data to another controller without hindrance from the controller to which the personal data have been provided, where: the processing is based on consent pursuant to point (a) of Article 6(1) or point (a) of Article 9(2) or on a contract pursuant to point (b) of Article 6(1); and",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "20.1.b",
            "description": "Rights of the data subject: Right to data portability - The data subject shall have the right to receive the personal data concerning him or her, which he or she has provided to a controller, in a structured, commonly used and machine-readable format and have the right to transmit those data to another controller without hindrance from the controller to which the personal data have been provided, where: the processing is carried out by automated means.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "20.2",
            "description": "Rights of the data subject: Right to data portability - In exercising his or her right to data portability pursuant to paragraph 1, the data subject shall have the right to have the personal data transmitted directly from one controller to another, where technically feasible. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "20.3",
            "description": "Rights of the data subject: Right to data portability - The exercise of the right referred to in paragraph 1 of this Article shall be without prejudice to Article 17. That right shall not apply to processing necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "20.4",
            "description": "Rights of the data subject: Right to data portability - The right referred to in paragraph 1 shall not adversely affect the rights and freedoms of others. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "21.1",
            "description": "Rights of the data subject: Right to object - The data subject shall have the right to object, on grounds relating to his or her particular situation, at any time to processing of personal data concerning him or her which is based on point (e) or (f) of Article 6(1), including profiling based on those provisions. 2The controller shall no longer process the personal data unless the controller demonstrates compelling legitimate grounds for the processing which override the interests, rights and freedoms of the data subject or for the establishment, exercise or defence of legal claims. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "21.2",
            "description": "Rights of the data subject: Right to object - Where personal data are processed for direct marketing purposes, the data subject shall have the right to object at any time to processing of personal data concerning him or her for such marketing, which includes profiling to the extent that it is related to such direct marketing. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "21.3",
            "description": "Rights of the data subject: Right to object - Where the data subject objects to processing for direct marketing purposes, the personal data shall no longer be processed for such purposes. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "21.4",
            "description": "Rights of the data subject: Right to object - At the latest at the time of the first communication with the data subject, the right referred to in paragraphs 1 and 2 shall be explicitly brought to the attention of the data subject and shall be presented clearly and separately from any other information. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "21.5",
            "description": "Rights of the data subject: Right to object - In the context of the use of information society services, and notwithstanding Directive 2002/58/EC, the data subject may exercise his or her right to object by automated means using technical specifications. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "21.6",
            "description": "Rights of the data subject: Right to object - Where personal data are processed for scientific or historical research purposes or statistical purposes pursuant to Article 89(1), the data subject, on grounds relating to his or her particular situation, shall have the right to object to processing of personal data concerning him or her, unless the processing is necessary for the performance of a task carried out for reasons of public interest. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "22.1",
            "description": "Rights of the data subject: Automated individual decision-making, including profiling - The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "22.2.a",
            "description": "Rights of the data subject: Automated individual decision-making, including profiling - Paragraph 1 shall not apply if the decision: is necessary for entering into, or performance of, a contract between the data subject and a data controller;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "22.2.b",
            "description": "Rights of the data subject: Automated individual decision-making, including profiling - Paragraph 1 shall not apply if the decision: is authorised by Union or Member State law to which the controller is subject and which also lays down suitable measures to safeguard the data subject’s rights and freedoms and legitimate interests; or",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "22.2.c",
            "description": "Rights of the data subject: Automated individual decision-making, including profiling - Paragraph 1 shall not apply if the decision: is based on the data subject’s explicit consent.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "22.3",
            "description": "Rights of the data subject: Automated individual decision-making, including profiling - In the cases referred to in points (a) and (c) of paragraph 2, the data controller shall implement suitable measures to safeguard the data subject’s rights and freedoms and legitimate interests, at least the right to obtain human intervention on the part of the controller, to express his or her point of view and to contest the decision. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "22.4",
            "description": "Rights of the data subject: Automated individual decision-making, including profiling - Decisions referred to in paragraph 2 shall not be based on special categories of personal data referred to in Article 9(1), unless point (a) or (g) of Article 9(2) applies and suitable measures to safeguard the data subject’s rights and freedoms and legitimate interests are in place. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.a",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: national security;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.b",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: defence;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.c",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: public security;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.d",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: the prevention, investigation, detection or prosecution of criminal offences or the execution of criminal penalties, including the safeguarding against and the prevention of threats to public security;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.e",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: other important objectives of general public interest of the Union or of a Member State, in particular an important economic or financial interest of the Union or of a Member State, including monetary, budgetary and taxation matters, public health and social security;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.f",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: the protection of judicial independence and judicial proceedings;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.g",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: the prevention, investigation, detection and prosecution of breaches of ethics for regulated professions;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.h",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: a monitoring, inspection or regulatory function connected, even occasionally, to the exercise of official authority in the cases referred to in points (a) to (e) and (g);",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.i",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: the protection of the data subject or the rights and freedoms of others;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.j",
            "description": "Rights of the data subject: Restrictions - Union or Member State law to which the data controller or processor is subject may restrict by way of a legislative measure the scope of the obligations and rights provided for in Articles 12 to 22 and Article 34, as well as Article 5 in so far as its provisions correspond to the rights and obligations provided for in Articles 12 to 22, when such a restriction respects the essence of the fundamental rights and freedoms and is a necessary and proportionate measure in a democratic society to safeguard: the enforcement of civil law claims.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.a",
            "description": "Rights of the data subject: Restrictions - In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least, where relevant, as to: the purposes of the processing or categories of processing;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.b",
            "description": "Rights of the data subject: Restrictions - In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least, where relevant, as to: the categories of personal data;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.c",
            "description": "Rights of the data subject: Restrictions - In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least, where relevant, as to: the scope of the restrictions introduced;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.d",
            "description": "Rights of the data subject: Restrictions - In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least, where relevant, as to: the safeguards to prevent abuse or unlawful access or transfer;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.e",
            "description": "Rights of the data subject: Restrictions - In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least, where relevant, as to: the specification of the controller or categories of controllers;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.f",
            "description": "Rights of the data subject: Restrictions - In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least, where relevant, as to: the storage periods and the applicable safeguards taking into account the nature, scope and purposes of the processing or categories of processing;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.g",
            "description": "Rights of the data subject: Restrictions - In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least, where relevant, as to: the risks to the rights and freedoms of data subjects; and",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "23.1.h",
            "description": "Rights of the data subject: Restrictions - In particular, any legislative measure referred to in paragraph 1 shall contain specific provisions at least, where relevant, as to: the right of data subjects to be informed about the restriction, unless that may be prejudicial to the purpose of the restriction.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "24.1",
            "description": "Controller and processor: Responsibility of the controller - Taking into account the nature, scope, context and purposes of processing as well as the risks of varying likelihood and severity for the rights and freedoms of natural persons, the controller shall implement appropriate technical and organisational measures to ensure and to be able to demonstrate that processing is performed in accordance with this Regulation. Those measures shall be reviewed and updated where necessary. ",
            "pscfIds": "PSCF-RM-BIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "24.2",
            "description": "Controller and processor: Responsibility of the controller - Where proportionate in relation to processing activities, the measures referred to in paragraph 1 shall include the implementation of appropriate data protection policies by the controller. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "25.1",
            "description": "Controller and processor: Data protection by design and by default - Taking into account the state of the art, the cost of implementation and the nature, scope, context and purposes of processing as well as the risks of varying likelihood and severity for rights and freedoms of natural persons posed by the processing, the controller shall, both at the time of the determination of the means for processing and at the time of the processing itself, implement appropriate technical and organisational measures, such as pseudonymisation, which are designed to implement data-protection principles, such as data minimisation, in an effective manner and to integrate the necessary safeguards into the processing in order to meet the requirements of this Regulation and protect the rights of data subjects. ",
            "pscfIds": "PSCF-SPI-ATM",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "25.2",
            "description": "Controller and processor: Data protection by design and by default - The controller shall implement appropriate technical and organisational measures for ensuring that, by default, only personal data which are necessary for each specific purpose of the processing are processed. That obligation applies to the amount of personal data collected, the extent of their processing, the period of their storage and their accessibility. In particular, such measures shall ensure that by default personal data are not made accessible without the individual’s intervention to an indefinite number of natural persons. ",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "26.1",
            "description": "Controller and processor: Joint controllers - Where two or more controllers jointly determine the purposes and means of processing, they shall be joint controllers. They shall in a transparent manner determine their respective responsibilities for compliance with the obligations under this Regulation, in particular as regards the exercising of the rights of the data subject and their respective duties to provide the information referred to in Articles 13 and 14, by means of an arrangement between them unless, and in so far as, the respective responsibilities of the controllers are determined by Union or Member State law to which the controllers are subject. The arrangement may designate a contact point for data subjects. ",
            "pscfIds": "PSCF-SPM-POM",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "26.2",
            "description": "Controller and processor: Joint controllers - The arrangement referred to in paragraph 1 shall duly reflect the respective roles and relationships of the joint controllers vis-à-vis the data subjects. The essence of the arrangement shall be made available to the data subject. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "27.1",
            "description": "Controller and processor: Representatives of controllers or processors not established in the Union - Where Article 3(2) applies, the controller or the processor shall designate in writing a representative in the Union. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "28.1",
            "description": "Controller and processor: Processor - Where processing is to be carried out on behalf of a controller, the controller shall use only processors providing sufficient guarantees to implement appropriate technical and organisational measures in such a manner that processing will meet the requirements of this Regulation and ensure the protection of the rights of the data subject. ",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.2",
            "description": "Controller and processor: Processor - The processor shall not engage another processor without prior specific or general written authorisation of the controller. In the case of general written authorisation, the processor shall inform the controller of any intended changes concerning the addition or replacement of other processors, thereby giving the controller the opportunity to object to such changes. ",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.3.a",
            "description": "Controller and processor: Processor - Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: processes the personal data only on documented instructions from the controller, including with regard to transfers of personal data to a third country or an international organisation, unless required to do so by Union or Member State law to which the processor is subject; in such a case, the processor shall inform the controller of that legal requirement before processing, unless that law prohibits such information on important grounds of public interest;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.3.b",
            "description": "Controller and processor: Processor - Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: ensures that persons authorised to process the personal data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.3.c",
            "description": "Controller and processor: Processor - Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: takes all measures required pursuant to Article 32;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.3.d",
            "description": "Controller and processor: Processor - Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: respects the conditions referred to in paragraphs 2 and 4 for engaging another processor;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.3.e",
            "description": "Controller and processor: Processor - Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: taking into account the nature of the processing, assists the controller by appropriate technical and organisational measures, insofar as this is possible, for the fulfilment of the controller’s obligation to respond to requests for exercising the data subject’s rights laid down in Chapter III;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.3.f",
            "description": "Controller and processor: Processor - Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: assists the controller in ensuring compliance with the obligations pursuant to Articles 32 to 36 taking into account the nature of processing and the information available to the processor;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.3.g",
            "description": "Controller and processor: Processor - Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: at the choice of the controller, deletes or returns all the personal data to the controller after the end of the provision of services relating to processing, and deletes existing copies unless Union or Member State law requires storage of the personal data;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.3.h",
            "description": "Controller and processor: Processor - Processing by a processor shall be governed by a contract or other legal act under Union or Member State law, that is binding on the processor with regard to the controller and that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller. That contract or other legal act shall stipulate, in particular, that the processor: makes available to the controller all information necessary to demonstrate compliance with the obligations laid down in this Article and allow for and contribute to audits, including inspections, conducted by the controller or another auditor mandated by the controller.\n\nWith regard to point (h) of the first subparagraph, the processor shall immediately inform the controller if, in its opinion, an instruction infringes this Regulation or other Union or Member State data protection provisions.",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "28.4",
            "description": "Controller and processor: Processor - Where a processor engages another processor for carrying out specific processing activities on behalf of the controller, the same data protection obligations as set out in the contract or other legal act between the controller and the processor as referred to in paragraph 3 shall be imposed on that other processor by way of a contract or other legal act under Union or Member State law, in particular providing sufficient guarantees to implement appropriate technical and organisational measures in such a manner that the processing will meet the requirements of this Regulation. 2Where that other processor fails to fulfil its data protection obligations, the initial processor shall remain fully liable to the controller for the performance of that other processor’s obligations. ",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.1.a",
            "description": "Controller and processor: Records of processing activities - Each controller and, where applicable, the controller’s representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: the name and contact details of the controller and, where applicable, the joint controller, the controller’s representative and the data protection officer;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.1.b",
            "description": "Controller and processor: Records of processing activities - Each controller and, where applicable, the controller’s representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: the purposes of the processing;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.1.c",
            "description": "Controller and processor: Records of processing activities - Each controller and, where applicable, the controller’s representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: a description of the categories of data subjects and of the categories of personal data;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.1.d",
            "description": "Controller and processor: Records of processing activities - Each controller and, where applicable, the controller’s representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: the categories of recipients to whom the personal data have been or will be disclosed including recipients in third countries or international organisations;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.1.e",
            "description": "Controller and processor: Records of processing activities - Each controller and, where applicable, the controller’s representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: where applicable, transfers of personal data to a third country or an international organisation, including the identification of that third country or international organisation and, in the case of transfers referred to in the second subparagraph of Article 49(1), the documentation of suitable safeguards;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.1.f",
            "description": "Controller and processor: Records of processing activities - Each controller and, where applicable, the controller’s representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: where possible, the envisaged time limits for erasure of the different categories of data;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.1.g",
            "description": "Controller and processor: Records of processing activities - Each controller and, where applicable, the controller’s representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: where possible, a general description of the technical and organisational security measures referred to in Article 32(1).",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.2.a",
            "description": "Controller and processor: Records of processing activities - Each processor and, where applicable, the processor’s representative shall maintain a record of all categories of processing activities carried out on behalf of a controller, containing: the name and contact details of the processor or processors and of each controller on behalf of which the processor is acting, and, where applicable, of the controller’s or the processor’s representative, and the data protection officer;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.2.b",
            "description": "Controller and processor: Records of processing activities - Each processor and, where applicable, the processor’s representative shall maintain a record of all categories of processing activities carried out on behalf of a controller, containing: the categories of processing carried out on behalf of each controller;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.2.c",
            "description": "Controller and processor: Records of processing activities - Each processor and, where applicable, the processor’s representative shall maintain a record of all categories of processing activities carried out on behalf of a controller, containing: where applicable, transfers of personal data to a third country or an international organisation, including the identification of that third country or international organisation and, in the case of transfers referred to in the second subparagraph of Article 49(1), the documentation of suitable safeguards;",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.2.d",
            "description": "Controller and processor: Records of processing activities - Each processor and, where applicable, the processor’s representative shall maintain a record of all categories of processing activities carried out on behalf of a controller, containing: where possible, a general description of the technical and organisational security measures referred to in Article 32(1).",
            "pscfIds": "PSCF-SPI-DC",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "30.3",
            "description": "Controller and processor: Records of processing activities - The records referred to in paragraphs 1 and 2 shall be in writing, including in electronic form. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "30.4",
            "description": "Controller and processor: Records of processing activities - The controller or the processor and, where applicable, the controller’s or the processor’s representative, shall make the record available to the supervisory authority on request. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "30.5",
            "description": "Controller and processor: Records of processing activities - The obligations referred to in paragraphs 1 and 2 shall not apply to an enterprise or an organisation employing fewer than 250 persons unless the processing it carries out is likely to result in a risk to the rights and freedoms of data subjects, the processing is not occasional, or the processing includes special categories of data as referred to in Article 9(1) or personal data relating to criminal convictions and offences referred to in Article 10. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "31.1",
            "description": "Controller and processor: Cooperation with the supervisory authority - The controller and the processor and, where applicable, their representatives, shall cooperate, on request, with the supervisory authority in the performance of its tasks. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "32.1.a",
            "description": "Controller and processor: Security of processing - Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons, the controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate: the pseudonymisation and encryption of personal data;",
            "pscfIds": "PSCF-SPM-MAR",
            "understanding": 3,
            "information": 4,
            "opportunity": 3
        },
        {
            "id": "32.1.b",
            "description": "Controller and processor: Security of processing - Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons, the controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate: the ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services;",
            "pscfIds": "PSCF-OV-EM",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "32.1.c",
            "description": "Controller and processor: Security of processing - Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons, the controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate: the ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident;",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "32.1.d",
            "description": "Controller and processor: Security of processing - Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons, the controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate: a process for regularly testing, assessing and evaluating the effectiveness of technical and organisational measures for ensuring the security of the processing.",
            "pscfIds": "PSCF-QC-EST",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "32.2",
            "description": "Controller and processor: Security of processing - In assessing the appropriate level of security account shall be taken in particular of the risks that are presented by processing, in particular from accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to personal data transmitted, stored or otherwise processed. ",
            "pscfIds": "PSCF-RM-BIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "32.4",
            "description": "Controller and processor: Security of processing - The controller and processor shall take steps to ensure that any natural person acting under the authority of the controller or the processor who has access to personal data does not process them except on instructions from the controller, unless he or she is required to do so by Union or Member State law. ",
            "pscfIds": "PSCF-RM-OOM",
            "understanding": 3,
            "information": 2,
            "opportunity": 3
        },
        {
            "id": "33.1",
            "description": "Controller and processor: Notification of a personal data breach to the supervisory authority - In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority competent in accordance with Article 55, unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons. Where the notification to the supervisory authority is not made within 72 hours, it shall be accompanied by reasons for the delay. ",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 3,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "33.2",
            "description": "Controller and processor: Notification of a personal data breach to the supervisory authority - The processor shall notify the controller without undue delay after becoming aware of a personal data breach. ",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 3,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "33.3.a",
            "description": "Controller and processor: Notification of a personal data breach to the supervisory authority - The notification referred to in paragraph 1 shall at least: describe the nature of the personal data breach including where possible, the categories and approximate number of data subjects concerned and the categories and approximate number of personal data records concerned;",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 3,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "33.3.b",
            "description": "Controller and processor: Notification of a personal data breach to the supervisory authority - The notification referred to in paragraph 1 shall at least: communicate the name and contact details of the data protection officer or other contact point where more information can be obtained;",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "33.3.c",
            "description": "Controller and processor: Notification of a personal data breach to the supervisory authority - The notification referred to in paragraph 1 shall at least: describe the likely consequences of the personal data breach;",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 4,
            "information": 3,
            "opportunity": 2
        },
        {
            "id": "33.3.d",
            "description": "Controller and processor: Notification of a personal data breach to the supervisory authority - The notification referred to in paragraph 1 shall at least: describe the measures taken or proposed to be taken by the controller to address the personal data breach, including, where appropriate, measures to mitigate its possible adverse effects.",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 3,
            "information": 3,
            "opportunity": 2
        },
        {
            "id": "33.4",
            "description": "Controller and processor: Notification of a personal data breach to the supervisory authority - Where, and in so far as, it is not possible to provide the information at the same time, the information may be provided in phases without undue further delay. ",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 3,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "33.5",
            "description": "Controller and processor: Notification of a personal data breach to the supervisory authority - The controller shall document any personal data breaches, comprising the facts relating to the personal data breach, its effects and the remedial action taken. That documentation shall enable the supervisory authority to verify compliance with this Article. ",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "34.1",
            "description": "Controller and processor: Communication of a personal data breach to the data subject - When the personal data breach is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall communicate the personal data breach to the data subject without undue delay. ",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 4,
            "information": 3,
            "opportunity": 2
        },
        {
            "id": "34.2",
            "description": "Controller and processor: Communication of a personal data breach to the data subject - The communication to the data subject referred to in paragraph 1 of this Article shall describe in clear and plain language the nature of the personal data breach and contain at least the information and measures referred to in points (b), (c) and (d) of Article 33(3). ",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 4,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "34.3.a",
            "description": "Controller and processor: Communication of a personal data breach to the data subject - The communication to the data subject referred to in paragraph 1 shall not be required if any of the following conditions are met: the controller has implemented appropriate technical and organisational protection measures, and those measures were applied to the personal data affected by the personal data breach, in particular those that render the personal data unintelligible to any person who is not authorised to access it, such as encryption;",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 4,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "34.3.b",
            "description": "Controller and processor: Communication of a personal data breach to the data subject - The communication to the data subject referred to in paragraph 1 shall not be required if any of the following conditions are met: the controller has taken subsequent measures which ensure that the high risk to the rights and freedoms of data subjects referred to in paragraph 1 is no longer likely to materialise;",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 4,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "34.3.c",
            "description": "Controller and processor: Communication of a personal data breach to the data subject - The communication to the data subject referred to in paragraph 1 shall not be required if any of the following conditions are met: it would involve disproportionate effort. In such a case, there shall instead be a public communication or similar measure whereby the data subjects are informed in an equally effective manner.",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 4,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "34.4",
            "description": "Controller and processor: Communication of a personal data breach to the data subject - If the controller has not already communicated the personal data breach to the data subject, the supervisory authority, having considered the likelihood of the personal data breach resulting in a high risk, may require it to do so or may decide that any of the conditions referred to in paragraph 3 are met. ",
            "pscfIds": "PSCF-OV-IR",
            "understanding": 4,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "35.1",
            "description": "Controller and processor: Data protection impact assessment - Where a type of processing in particular using new technologies, and taking into account the nature, scope, context and purposes of the processing, is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment of the impact of the envisaged processing operations on the protection of personal data. A single assessment may address a set of similar processing operations that present similar high risks. ",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 4,
            "opportunity": 3
        },
        {
            "id": "35.2",
            "description": "Controller and processor: Data protection impact assessment - The controller shall seek the advice of the data protection officer, where designated, when carrying out a data protection impact assessment. ",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 2,
            "information": 2,
            "opportunity": 3
        },
        {
            "id": "35.3.a",
            "description": "Controller and processor: Data protection impact assessment - A data protection impact assessment referred to in paragraph 1 shall in particular be required in the case of: a systematic and extensive evaluation of personal aspects relating to natural persons which is based on automated processing, including profiling, and on which decisions are based that produce legal effects concerning the natural person or similarly significantly affect the natural person;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.3.b",
            "description": "Controller and processor: Data protection impact assessment - A data protection impact assessment referred to in paragraph 1 shall in particular be required in the case of: processing on a large scale of special categories of data referred to in Article 9(1), or of personal data relating to criminal convictions and offences referred to in Article 10; or",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.3.c",
            "description": "Controller and processor: Data protection impact assessment - A data protection impact assessment referred to in paragraph 1 shall in particular be required in the case of: a systematic monitoring of a publicly accessible area on a large scale.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.7.a",
            "description": "Controller and processor: Data protection impact assessment - The assessment shall contain at least: a systematic description of the envisaged processing operations and the purposes of the processing, including, where applicable, the legitimate interest pursued by the controller;",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.7.b",
            "description": "Controller and processor: Data protection impact assessment - The assessment shall contain at least: an assessment of the necessity and proportionality of the processing operations in relation to the purposes;",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.7.c",
            "description": "Controller and processor: Data protection impact assessment - The assessment shall contain at least: an assessment of the risks to the rights and freedoms of data subjects referred to in paragraph 1; and",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.7.d",
            "description": "Controller and processor: Data protection impact assessment - The assessment shall contain at least: the measures envisaged to address the risks, including safeguards, security measures and mechanisms to ensure the protection of personal data and to demonstrate compliance with this Regulation taking into account the rights and legitimate interests of data subjects and other persons concerned.",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.9",
            "description": "Controller and processor: Data protection impact assessment - Where appropriate, the controller shall seek the views of data subjects or their representatives on the intended processing, without prejudice to the protection of commercial or public interests or the security of processing operations. ",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.10",
            "description": "Controller and processor: Data protection impact assessment - Where processing pursuant to point (c) or (e) of Article 6(1) has a legal basis in Union law or in the law of the Member State to which the controller is subject, that law regulates the specific processing operation or set of operations in question, and a data protection impact assessment has already been carried out as part of a general impact assessment in the context of the adoption of that legal basis, paragraphs 1 to 7 shall not apply unless Member States deem it to be necessary to carry out such an assessment prior to processing activities. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "35.11",
            "description": "Controller and processor: Data protection impact assessment - Where necessary, the controller shall carry out a review to assess if processing is performed in accordance with the data protection impact assessment at least when there is a change of the risk represented by processing operations. ",
            "pscfIds": "PSCF-RM-CCI",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "36.1",
            "description": "Controller and processor: Prior consultation - The controller shall consult the supervisory authority prior to processing where a data protection impact assessment under Article 35 indicates that the processing would result in a high risk in the absence of measures taken by the controller to mitigate the risk. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "36.3.a",
            "description": "Controller and processor: Prior consultation - When consulting the supervisory authority pursuant to paragraph 1, the controller shall provide the supervisory authority with: where applicable, the respective responsibilities of the controller, joint controllers and processors involved in the processing, in particular for processing within a group of undertakings;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "36.3.b",
            "description": "Controller and processor: Prior consultation - When consulting the supervisory authority pursuant to paragraph 1, the controller shall provide the supervisory authority with: the purposes and means of the intended processing;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "36.3.c",
            "description": "Controller and processor: Prior consultation - When consulting the supervisory authority pursuant to paragraph 1, the controller shall provide the supervisory authority with: the measures and safeguards provided to protect the rights and freedoms of data subjects pursuant to this Regulation;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "36.3.d",
            "description": "Controller and processor: Prior consultation - When consulting the supervisory authority pursuant to paragraph 1, the controller shall provide the supervisory authority with: where applicable, the contact details of the data protection officer;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "36.3.e",
            "description": "Controller and processor: Prior consultation - When consulting the supervisory authority pursuant to paragraph 1, the controller shall provide the supervisory authority with: the data protection impact assessment provided for in Article 35; and",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "36.3.f",
            "description": "Controller and processor: Prior consultation - When consulting the supervisory authority pursuant to paragraph 1, the controller shall provide the supervisory authority with: any other information requested by the supervisory authority.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.1.a",
            "description": "Controller and processor: Designation of the data protection officer - The controller and the processor shall designate a data protection officer in any case where: the processing is carried out by a public authority or body, except for courts acting in their judicial capacity;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.1.b",
            "description": "Controller and processor: Designation of the data protection officer - The controller and the processor shall designate a data protection officer in any case where: the core activities of the controller or the processor consist of processing operations which, by virtue of their nature, their scope and/or their purposes, require regular and systematic monitoring of data subjects on a large scale; or",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.1.c",
            "description": "Controller and processor: Designation of the data protection officer - The controller and the processor shall designate a data protection officer in any case where: the core activities of the controller or the processor consist of processing on a large scale of special categories of data pursuant to Article 9 or personal data relating to criminal convictions and offences referred to in Article 10.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.2",
            "description": "Controller and processor: Designation of the data protection officer - A group of undertakings may appoint a single data protection officer provided that a data protection officer is easily accessible from each establishment. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.3",
            "description": "Controller and processor: Designation of the data protection officer - Where the controller or the processor is a public authority or body, a single data protection officer may be designated for several such authorities or bodies, taking account of their organisational structure and size. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.4",
            "description": "Controller and processor: Designation of the data protection officer - In cases other than those referred to in paragraph 1, the controller or processor or associations and other bodies representing categories of controllers or processors may or, where required by Union or Member State law shall, designate a data protection officer. The data protection officer may act for such associations and other bodies representing controllers or processors. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.5",
            "description": "Controller and processor: Designation of the data protection officer - The data protection officer shall be designated on the basis of professional qualities and, in particular, expert knowledge of data protection law and practices and the ability to fulfil the tasks referred to in Article 39. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.6",
            "description": "Controller and processor: Designation of the data protection officer - The data protection officer may be a staff member of the controller or processor, or fulfil the tasks on the basis of a service contract. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "37.7",
            "description": "Controller and processor: Designation of the data protection officer - The controller or the processor shall publish the contact details of the data protection officer and communicate them to the supervisory authority. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "38.1",
            "description": "Controller and processor: Position of the data protection officer - The controller and the processor shall ensure that the data protection officer is involved, properly and in a timely manner, in all issues which relate to the protection of personal data. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "38.2",
            "description": "Controller and processor: Position of the data protection officer - The controller and processor shall support the data protection officer in performing the tasks referred to in Article 39 by providing resources necessary to carry out those tasks and access to personal data and processing operations, and to maintain his or her expert knowledge. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "38.3",
            "description": "Controller and processor: Position of the data protection officer - The controller and processor shall ensure that the data protection officer does not receive any instructions regarding the exercise of those tasks. He or she shall not be dismissed or penalised by the controller or the processor for performing his tasks. The data protection officer shall directly report to the highest management level of the controller or the processor. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "38.4",
            "description": "Controller and processor: Position of the data protection officer - Data subjects may contact the data protection officer with regard to all issues related to processing of their personal data and to the exercise of their rights under this Regulation. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "38.5",
            "description": "Controller and processor: Position of the data protection officer - The data protection officer shall be bound by secrecy or confidentiality concerning the performance of his or her tasks, in accordance with Union or Member State law. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "38.6",
            "description": "Controller and processor: Position of the data protection officer - The data protection officer may fulfil other tasks and duties. The controller or processor shall ensure that any such tasks and duties do not result in a conflict of interests. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "39.1.a",
            "description": "Controller and processor: Tasks of the data protection officer - The data protection officer shall have at least the following tasks: to inform and advise the controller or the processor and the employees who carry out processing of their obligations pursuant to this Regulation and to other Union or Member State data protection provisions;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "39.1.b",
            "description": "Controller and processor: Tasks of the data protection officer - The data protection officer shall have at least the following tasks: to monitor compliance with this Regulation, with other Union or Member State data protection provisions and with the policies of the controller or processor in relation to the protection of personal data, including the assignment of responsibilities, awareness-raising and training of staff involved in processing operations, and the related audits;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "39.1.c",
            "description": "Controller and processor: Tasks of the data protection officer - The data protection officer shall have at least the following tasks: to provide advice where requested as regards the data protection impact assessment and monitor its performance pursuant to Article 35;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "39.1.d",
            "description": "Controller and processor: Tasks of the data protection officer - The data protection officer shall have at least the following tasks: to cooperate with the supervisory authority;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "39.1.e",
            "description": "Controller and processor: Tasks of the data protection officer - The data protection officer shall have at least the following tasks: to act as the contact point for the supervisory authority on issues relating to processing, including the prior consultation referred to in Article 36, and to consult, where appropriate, with regard to any other matter.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "39.2",
            "description": "Controller and processor: Tasks of the data protection officer - The data protection officer shall in the performance of his or her tasks have due regard to the risk associated with processing operations, taking into account the nature, scope, context and purposes of processing. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "40.3",
            "description": "Controller and processor: Codes of conduct - In addition to adherence by controllers or processors subject to this Regulation, codes of conduct approved pursuant to paragraph 5 of this Article and having general validity pursuant to paragraph 9 of this Article may also be adhered to by controllers or processors that are not subject to this Regulation pursuant to Article 3 in order to provide appropriate safeguards within the framework of personal data transfers to third countries or international organisations under the terms referred to in point (e) of Article 46(2). 2Such controllers or processors shall make binding and enforceable commitments, via contractual or other legally binding instruments, to apply those appropriate safeguards including with regard to the rights of data subjects. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "44",
            "description": "Transfers of personal data to third countries or international organisations: General principle for transfers - Any transfer of personal data which are undergoing processing or are intended for processing after transfer to a third country or to an international organisation shall take place only if, subject to the other provisions of this Regulation, the conditions laid down in this Chapter are complied with by the controller and processor, including for onward transfers of personal data from the third country or an international organisation to another third country or to another international organisation. All provisions in this Chapter shall be applied in order to ensure that the level of protection of natural persons guaranteed by this Regulation is not undermined. ",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "45.1",
            "description": "Transfers of personal data to third countries or international organisations: Transfers on the basis of an adequacy decision - A transfer of personal data to a third country or an international organisation may take place where the Commission has decided that the third country, a territory or one or more specified sectors within that third country, or the international organisation in question ensures an adequate level of protection. 2Such a transfer shall not require any specific authorisation. ",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "45.2.a",
            "description": "Transfers of personal data to third countries or international organisations: Transfers on the basis of an adequacy decision - When assessing the adequacy of the level of protection, the Commission shall, in particular, take account of the following elements: the rule of law, respect for human rights and fundamental freedoms, relevant legislation, both general and sectoral, including concerning public security, defence, national security and criminal law and the access of public authorities to personal data, as well as the implementation of such legislation, data protection rules, professional rules and security measures, including rules for the onward transfer of personal data to another third country or international organisation which are complied with in that country or international organisation, case-law, as well as effective and enforceable data subject rights and effective administrative and judicial redress for the data subjects whose personal data are being transferred;",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "45.2.b",
            "description": "Transfers of personal data to third countries or international organisations: Transfers on the basis of an adequacy decision - When assessing the adequacy of the level of protection, the Commission shall, in particular, take account of the following elements: the existence and effective functioning of one or more independent supervisory authorities in the third country or to which an international organisation is subject, with responsibility for ensuring and enforcing compliance with the data protection rules, including adequate enforcement powers, for assisting and advising the data subjects in exercising their rights and for cooperation with the supervisory authorities of the Member States; and",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "45.2.c",
            "description": "Transfers of personal data to third countries or international organisations: Transfers on the basis of an adequacy decision - When assessing the adequacy of the level of protection, the Commission shall, in particular, take account of the following elements: the international commitments the third country or international organisation concerned has entered into, or other obligations arising from legally binding conventions or instruments as well as from its participation in multilateral or regional systems, in particular in relation to the protection of personal data.",
            "pscfIds": "PSCF-RM-DIA",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.1",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - In the absence of a decision pursuant to Article 45(3), a controller or processor may transfer personal data to a third country or an international organisation only if the controller or processor has provided appropriate safeguards, and on condition that enforceable data subject rights and effective legal remedies for data subjects are available. ",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.2.a",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - The appropriate safeguards referred to in paragraph 1 may be provided for, without requiring any specific authorisation from a supervisory authority, by: a legally binding and enforceable instrument between public authorities or bodies;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 2,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.2.b",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - The appropriate safeguards referred to in paragraph 1 may be provided for, without requiring any specific authorisation from a supervisory authority, by: binding corporate rules in accordance with Article 47;",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 2,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.2.c",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - The appropriate safeguards referred to in paragraph 1 may be provided for, without requiring any specific authorisation from a supervisory authority, by: standard data protection clauses adopted by the Commission in accordance with the examination procedure referred to in Article 93(2);",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 2,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.2.d",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - The appropriate safeguards referred to in paragraph 1 may be provided for, without requiring any specific authorisation from a supervisory authority, by: standard data protection clauses adopted by a supervisory authority and approved by the Commission pursuant to the examination procedure referred to in Article 93(2);",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 2,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.2.e",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - The appropriate safeguards referred to in paragraph 1 may be provided for, without requiring any specific authorisation from a supervisory authority, by: an approved code of conduct pursuant to Article 40 together with binding and enforceable commitments of the controller or processor in the third country to apply the appropriate safeguards, including as regards data subjects’ rights; or",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 2,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.2.f",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - The appropriate safeguards referred to in paragraph 1 may be provided for, without requiring any specific authorisation from a supervisory authority, by: an approved certification mechanism pursuant to Article 42 together with binding and enforceable commitments of the controller or processor in the third country to apply the appropriate safeguards, including as regards data subjects’ rights.",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 2,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.3.a",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - Subject to the authorisation from the competent supervisory authority, the appropriate safeguards referred to in paragraph 1 may also be provided for, in particular, by: contractual clauses between the controller or processor and the controller, processor or the recipient of the personal data in the third country or international organisation; or",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 2,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "46.3.b",
            "description": "Transfers of personal data to third countries or international organisations: Transfers subject to appropriate safeguards - Subject to the authorisation from the competent supervisory authority, the appropriate safeguards referred to in paragraph 1 may also be provided for, in particular, by: provisions to be inserted into administrative arrangements between public authorities or bodies which include enforceable and effective data subject rights.",
            "pscfIds": "PSCF-RM-TPS",
            "understanding": 2,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.a",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the structure and contact details of the group of undertakings, or group of enterprises engaged in a joint economic activity and of each of its members;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.b",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the data transfers or set of transfers, including the categories of personal data, the type of processing and its purposes, the type of data subjects affected and the identification of the third country or countries in question;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.c",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: their legally binding nature, both internally and externally;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.d",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the application of the general data protection principles, in particular purpose limitation, data minimisation, limited storage periods, data quality, data protection by design and by default, legal basis for processing, processing of special categories of personal data, measures to ensure data security, and the requirements in respect of onward transfers to bodies not bound by the binding corporate rules;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.e",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the rights of data subjects in regard to processing and the means to exercise those rights, including the right not to be subject to decisions based solely on automated processing, including profiling in accordance with Article 22, the right to lodge a complaint with the competent supervisory authority and before the competent courts of the Member States in accordance with Article 79, and to obtain redress and, where appropriate, compensation for a breach of the binding corporate rules;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.f",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the acceptance by the controller or processor established on the territory of a Member State of liability for any breaches of the binding corporate rules by any member concerned not established in the Union; the controller or the processor shall be exempt from that liability, in whole or in part, only if it proves that that member is not responsible for the event giving rise to the damage;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.g",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: how the information on the binding corporate rules, in particular on the provisions referred to in points (d), (e) and (f) of this paragraph is provided to the data subjects in addition to Articles 13 and 14;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.h",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the tasks of any data protection officer designated in accordance with Article 37 or any other person or entity in charge of the monitoring compliance with the binding corporate rules within the group of undertakings, or group of enterprises engaged in a joint economic activity, as well as monitoring training and complaint-handling;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.i",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the complaint procedures;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.j",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the mechanisms within the group of undertakings, or group of enterprises engaged in a joint economic activity for ensuring the verification of compliance with the binding corporate rules. Such mechanisms shall include data protection audits and methods for ensuring corrective actions to protect the rights of the data subject. Results of such verification should be communicated to the person or entity referred to in point (h) and to the board of the controlling undertaking of a group of undertakings, or of the group of enterprises engaged in a joint economic activity, and should be available upon request to the competent supervisory authority;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.k",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the mechanisms for reporting and recording changes to the rules and reporting those changes to the supervisory authority;",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.l",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the cooperation mechanism with the supervisory authority to ensure compliance by any member of the group of undertakings, or group of enterprises engaged in a joint economic activity, in particular by making available to the supervisory authority the results of verifications of the measures referred to in point (j);",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.m",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the mechanisms for reporting to the competent supervisory authority any legal requirements to which a member of the group of undertakings, or group of enterprises engaged in a joint economic activity is subject in a third country which are likely to have a substantial adverse effect on the guarantees provided by the binding corporate rules; and",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "47.2.n",
            "description": "Transfers of personal data to third countries or international organisations: Binding corporate rules - The binding corporate rules referred to in paragraph 1 shall specify at least: the appropriate data protection training to personnel having permanent or regular access to personal data.",
            "pscfIds": "PSCF-RM-CO",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.1.a",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - In the absence of an adequacy decision pursuant to Article 45(3), or of appropriate safeguards pursuant to Article 46, including binding corporate rules, a transfer or a set of transfers of personal data to a third country or an international organisation shall take place only on one of the following conditions: the data subject has explicitly consented to the proposed transfer, after having been informed of the possible risks of such transfers for the data subject due to the absence of an adequacy decision and appropriate safeguards;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.1.b",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - In the absence of an adequacy decision pursuant to Article 45(3), or of appropriate safeguards pursuant to Article 46, including binding corporate rules, a transfer or a set of transfers of personal data to a third country or an international organisation shall take place only on one of the following conditions: the transfer is necessary for the performance of a contract between the data subject and the controller or the implementation of pre-contractual measures taken at the data subject’s request;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.1.c",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - In the absence of an adequacy decision pursuant to Article 45(3), or of appropriate safeguards pursuant to Article 46, including binding corporate rules, a transfer or a set of transfers of personal data to a third country or an international organisation shall take place only on one of the following conditions: the transfer is necessary for the conclusion or performance of a contract concluded in the interest of the data subject between the controller and another natural or legal person;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.1.d",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - In the absence of an adequacy decision pursuant to Article 45(3), or of appropriate safeguards pursuant to Article 46, including binding corporate rules, a transfer or a set of transfers of personal data to a third country or an international organisation shall take place only on one of the following conditions: the transfer is necessary for important reasons of public interest;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.1.e",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - In the absence of an adequacy decision pursuant to Article 45(3), or of appropriate safeguards pursuant to Article 46, including binding corporate rules, a transfer or a set of transfers of personal data to a third country or an international organisation shall take place only on one of the following conditions: the transfer is necessary for the establishment, exercise or defence of legal claims;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.1.f",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - In the absence of an adequacy decision pursuant to Article 45(3), or of appropriate safeguards pursuant to Article 46, including binding corporate rules, a transfer or a set of transfers of personal data to a third country or an international organisation shall take place only on one of the following conditions: the transfer is necessary in order to protect the vital interests of the data subject or of other persons, where the data subject is physically or legally incapable of giving consent;",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.1.g",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - In the absence of an adequacy decision pursuant to Article 45(3), or of appropriate safeguards pursuant to Article 46, including binding corporate rules, a transfer or a set of transfers of personal data to a third country or an international organisation shall take place only on one of the following conditions: the transfer is made from a register which according to Union or Member State law is intended to provide information to the public and which is open to consultation either by the public in general or by any person who can demonstrate a legitimate interest, but only to the extent that the conditions laid down by Union or Member State law for consultation are fulfilled in the particular case.\n\nWhere a transfer could not be based on a provision in Article 45 or 46, including the provisions on binding corporate rules, and none of the derogations for a specific situation referred to in the first subparagraph of this paragraph is applicable, a transfer to a third country or an international organisation may take place only if the transfer is not repetitive, concerns only a limited number of data subjects, is necessary for the purposes of compelling legitimate interests pursued by the controller which are not overridden by the interests or rights and freedoms of the data subject, and the controller has assessed all the circumstances surrounding the data transfer and has on the basis of that assessment provided suitable safeguards with regard to the protection of personal data. 3The controller shall inform the supervisory authority of the transfer. 4The controller shall, in addition to providing the information referred to in Articles 13 and 14, inform the data subject of the transfer and on the compelling legitimate interests pursued.",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.2",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - A transfer pursuant to point (g) of the first subparagraph of paragraph 1 shall not involve the entirety of the personal data or entire categories of the personal data contained in the register. Where the register is intended for consultation by persons having a legitimate interest, the transfer shall be made only at the request of those persons or if they are to be the recipients. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.3",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - Points (a), (b) and (c) of the first subparagraph of paragraph 1 and the second subparagraph thereof shall not apply to activities carried out by public authorities in the exercise of their public powers. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.4",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - The public interest referred to in point (d) of the first subparagraph of paragraph 1 shall be recognised in Union law or in the law of the Member State to which the controller is subject. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.5",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - In the absence of an adequacy decision, Union or Member State law may, for important reasons of public interest, expressly set limits to the transfer of specific categories of personal data to a third country or an international organisation. Member States shall notify such provisions to the Commission. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "49.6",
            "description": "Transfers of personal data to third countries or international organisations: Derogations for specific situations - The controller or processor shall document the assessment as well as the suitable safeguards referred to in the second subparagraph of paragraph 1 of this Article in the records referred to in Article 30. ",
            "pscfIds": "PSCF-RM-DPO",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        }
    ]


    const nistSSDFData: Mapping[] = [
        {
            "id": "PO.1.1",
            "description": "Identify and document all security requirements for the organization’s software development infrastructures and processes, and maintain the requirements over time.",
            "pscfIds": "PSCF-RM-CO PSCF-RM-DPO",
            "understanding": 2,
            "information": 2,
            "opportunity": 3
        },
        {
            "id": "PO.1.2",
            "description": "Identify and document all security requirements for organization-developed software to meet, and maintain the requirements over time.",
            "pscfIds": "PSCF-SPM-MAR PSCF-SPM-POM PSCF-SPM-RC PSCF-SPM-RSS",
            "understanding": 3,
            "information": 2,
            "opportunity": 3
        },
        {
            "id": "PO.1.3",
            "description": "Communicate requirements to all third parties who will provide commercial software components to the organization for reuse by the organization’s own software. [Formerly PW.3.1]",
            "pscfIds": "PSCF-RM-TPC",
            "understanding": 3,
            "information": 2,
            "opportunity": 4
        },
        {
            "id": "PO.2.1",
            "description": "Create new roles and alter responsibilities for existing roles as needed to encompass all parts of the SDLC. Periodically review and maintain the defined roles and responsibilities, updating them as needed.",
            "pscfIds": "PSCF-RM-OOM",
            "understanding": 3,
            "information": 2,
            "opportunity": 3
        },
        {
            "id": "PO.2.2",
            "description": "Provide role-based training for all personnel with responsibilities that contribute to secure development. Periodically review personnel proficiency and role-based training, and update the training as needed.",
            "pscfIds": "PSCF-RM-CCI",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "PO.2.3",
            "description": "Obtain upper management or authorizing official commitment to secure development, and convey that commitment to all with development-related roles and responsibilities.",
            "pscfIds": "PSCF-RM-OOM",
            "understanding": 3,
            "information": 2,
            "opportunity": 3
        },
        {
            "id": "PO.3.1",
            "description": "Specify which tools or tool types must or should be included in each toolchain to mitigate identified risks, as well as how the toolchain components are to be integrated with each other.",
            "pscfIds": "PSCF-SBD",
            "understanding": 2,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "PO.3.2",
            "description": "Follow recommended security practices to deploy, operate, and maintain tools and toolchains.",
            "pscfIds": "PSCF-SBD",
            "understanding": 3,
            "information": 4,
            "opportunity": 4
        },
        {
            "id": "PO.3.3",
            "description": "Configure tools to generate artifacts  of their support of secure software development practices as defined by the organization.",
            "pscfIds": "PSCF-SBD",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "PO.4.1",
            "description": "Define criteria for software security checks and track throughout the SDLC.",
            "pscfIds": "PSCF-QC",
            "understanding": 5,
            "information": 5,
            "opportunity": 4
        },
        {
            "id": "PO.4.2",
            "description": "Implement processes, mechanisms, etc. to gather and safeguard the necessary information in support of the criteria.",
            "pscfIds": "PSCF-QC",
            "understanding": 5,
            "information": 4,
            "opportunity": 5
        },
        {
            "id": "PO.5.1",
            "description": "Separate and protect each environment involved in software development.",
            "pscfIds": "PSCF-OV-EM PSCF-OV-ID PSCF-OV-IR",
            "understanding": 3,
            "information": 4,
            "opportunity": 4
        },
        {
            "id": "PO.5.2",
            "description": "Secure and harden development endpoints (i.e., endpoints for software designers, developers, testers, builders, etc.) to perform development-related tasks using a risk-based approach.",
            "pscfIds": "PSCF-OV-EM",
            "understanding": 3,
            "information": 4,
            "opportunity": 4
        },
        {
            "id": "PS.1.1",
            "description": "Store all forms of code – including source code, executable code, and configuration-as-code –  based on the principle of least privilege so that only authorized personnel, tools, services, etc. have access.",
            "pscfIds": "PSCF-SBD-BP",
            "understanding": 3,
            "information": 4,
            "opportunity": 5
        },
        {
            "id": "PS.2.1",
            "description": "Make software integrity verification information available to software acquirers.",
            "pscfIds": "PSCF-SBD-DP",
            "understanding": 5,
            "information": 4,
            "opportunity": 3
        },
        {
            "id": "PS.3.1",
            "description": "Securely archive the necessary files and supporting data (e.g., integrity verification information, provenance data) to be retained for each software release.",
            "pscfIds": "PSCF-SBD-AI",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "PS.3.2",
            "description": "Collect, safeguard, maintain, and share provenance data for all components of each software release (e.g., in a software bill of materials [SBOM]).",
            "pscfIds": "PSCF-SBD-DM",
            "understanding": 3,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "PW.1.1",
            "description": "Use forms of risk modeling – such as threat modeling, attack modeling, or attack surface mapping – to help assess the security risk for the software.",
            "pscfIds": "PSCF-SPI-ATM",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "PW.1.2",
            "description": "Track and maintain the software’s security requirements, risks, and design decisions.",
            "pscfIds": "PSCF-SPM-MAR",
            "understanding": 3,
            "information": 2,
            "opportunity": 3
        },
        {
            "id": "PW.1.3",
            "description": "Where appropriate, build in support for using standardized security features and services (e.g., enabling software to integrate with existing log management, identity management, access control, and vulnerability management systems) instead of creating proprietary implementations of security features and services. [Formerly PW.4.3]",
            "pscfIds": "PSCF-SPM-RSS",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "PW.2.1",
            "description": "Have 1) a qualified person (or people) who were not involved with the design and/or 2) automated processes instantiated in the toolchain review the software design to confirm and enforce that it meets all of the security requirements and satisfactorily addresses the identified risk information.",
            "pscfIds": "PSCF-SPI-ATM",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "PW.4.1",
            "description": "Acquire and maintain well-secured software components (e.g., software libraries, modules, middleware, frameworks) from commercial, open-source, and other third-party developers for use by the organization’s software.",
            "pscfIds": "PSCF-SPM-RC PSCF-SPI-CM PSCF-SBD-DM",
            "understanding": 3,
            "information": 3,
            "opportunity": 4
        },
        {
            "id": "PW.4.2",
            "description": "Create and maintain well-secured software components in-house following SDLC processes to meet common internal software development needs that cannot be better met by third-party software components.",
            "pscfIds": "PSCF-SPM-RC PSCF-SPI-CM PSCF-SBD-DM",
            "understanding": 3,
            "information": 3,
            "opportunity": 4
        },
        {
            "id": "PW.4.4",
            "description": "Verify that acquired commercial, open-source, and all other third-party software components comply with the requirements, as defined by the organization, throughout their life cycles.",
            "pscfIds": "PSCF-SPI-CM PSCF-SBD-DM",
            "understanding": 3,
            "information": 4,
            "opportunity": 3
        },
        {
            "id": "PW.5.1",
            "description": "Follow all secure coding practices that are appropriate to the development languages and environment to meet the organization’s requirements.",
            "pscfIds": "PSCF-SPI-SCP",
            "understanding": 3,
            "information": 4,
            "opportunity": 5
        },
        {
            "id": "PW.6.1",
            "description": "Use compiler, interpreter, and build tools that offer features to improve executable security.",
            "pscfIds": "PSCF-SBD-BP",
            "understanding": 3,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "PW.6.2",
            "description": "Determine which compiler, interpreter, and build tool features should be used and how each should be configured, then implement and use the approved configurations.",
            "pscfIds": "PSCF-SBD-BP",
            "understanding": 3,
            "information": 4,
            "opportunity": 5
        },
        {
            "id": "PW.7.1",
            "description": "Determine whether code review (a person looks directly at the code to find issues) and/or code analysis (tools are used to find issues in code, either in a fully automated way or in conjunction with a person) should be used, as defined by the organization.",
            "pscfIds": "PSCF-QC-CST",
            "understanding": 3,
            "information": 3,
            "opportunity": 2
        },
        {
            "id": "PW.7.2",
            "description": "Perform the code review and/or code analysis based on the organization’s secure coding standards, and record and triage all discovered issues and recommended remediations in the development team’s workflow or issue tracking system.",
            "pscfIds": "PSCF-QC-CST",
            "understanding": 4,
            "information": 3,
            "opportunity": 4
        },
        {
            "id": "PW.8.1",
            "description": "Determine whether executable code testing should be performed to find vulnerabilities not identified by previous reviews, analysis, or testing and, if so, which types of testing should be used.",
            "pscfIds": "PSCF-QC-EST",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "PW.8.2",
            "description": "Scope the testing, design the tests, perform the testing, and document the results, including recording and triaging all discovered issues and recommended remediations in the development team’s workflow or issue tracking system.",
            "pscfIds": "PSCF-QC-EST PSCF-QC-SDM",
            "understanding": 4,
            "information": 4,
            "opportunity": 5
        },
        {
            "id": "PW.9.1",
            "description": "Define a secure baseline by determining how to configure each setting that has an effect on security or a security-related setting so that the default settings are secure and do not weaken the security functions provided by the platform, network infrastructure, or services.",
            "pscfIds": "PSCF-OV-EM",
            "understanding": 3,
            "information": 3,
            "opportunity": 1
        },
        {
            "id": "PW.9.2",
            "description": "Implement the default settings (or groups of default settings, if applicable), and document each setting for software administrators.",
            "pscfIds": "PSCF-OV-EM",
            "understanding": 3,
            "information": 3,
            "opportunity": 1
        },
        {
            "id": "RV.1.1",
            "description": "Gather information from software acquirers, users, and public sources on potential vulnerabilities in the software and third-party components that the software uses, and investigate all credible reports.",
            "pscfIds": "PSCF-RM-TI PSCF-SPI-CM PSCF-SBD-DM",
            "understanding": 3,
            "information": 4,
            "opportunity": 4
        },
        {
            "id": "RV.1.2",
            "description": "Review, analyze, and/or test the software’s code to identify or confirm the presence of previously undetected vulnerabilities.",
            "pscfIds": "PSCF-QC-CST",
            "understanding": 4,
            "information": 3,
            "opportunity": 3
        },
        {
            "id": "RV.1.3",
            "description": "Have a policy that addresses vulnerability disclosure and remediation, and implement the roles, responsibilities, and processes needed to support that policy.",
            "pscfIds": "PSCF-QC-EST PSCF-OV-IR",
            "understanding": 3,
            "information": 2,
            "opportunity": 2
        },
        {
            "id": "RV.2.1",
            "description": "Analyze each vulnerability to gather sufficient information about risk to plan its remediation or other risk response.",
            "pscfIds": "PSCF-QC-SDM",
            "understanding": 3,
            "information": 4,
            "opportunity": 2
        },
        {
            "id": "RV.2.2",
            "description": "Plan and implement risk responses for vulnerabilities.",
            "pscfIds": "PSCF-QC-SDM",
            "understanding": 3,
            "information": 3,
            "opportunity": 2
        },
        {
            "id": "RV.3.1",
            "description": "Analyze identified vulnerabilities to determine their root causes.",
            "pscfIds": "PSCF-RM-CCI PSCF-SPM-QM",
            "understanding": 4,
            "information": 3,
            "opportunity": 2
        },
        {
            "id": "RV.3.2",
            "description": "Analyze the root causes over time to identify patterns, such as a particular secure coding practice not being followed consistently.",
            "pscfIds": "PSCF-RM-CCI PSCF-SPM-QM",
            "understanding": 4,
            "information": 3,
            "opportunity": 4
        },
        {
            "id": "RV.3.3",
            "description": "Review the software for similar vulnerabilities to eradicate a class of vulnerabilities, and proactively fix them rather than waiting for external reports.",
            "pscfIds": "PSCF-RM-CCI PSCF-SPI-SCP",
            "understanding": 3,
            "information": 3,
            "opportunity": 4
        },
        {
            "id": "RV.3.4",
            "description": "Review the SDLC process, and update it if appropriate to prevent (or reduce the likelihood of) the root cause recurring in updates to the software or in new software that is created.",
            "pscfIds": "PSCF-RM-CCI PSCF-SBD-BP",
            "understanding": 4,
            "information": 3,
            "opportunity": 4
        }
    ]

    const tableData = capabilityData.map(capability => ({
        ...capability,
        mappings: gdprData.filter(mapping => mapping.pscfIds.includes(capability.id)),
    })
    )

    const columnHelper = createColumnHelper<Capability>()

    const columns = [
        columnHelper.accessor('area', {
            id: 'area',
            header: () => <span className="">Area</span>,
          }),
        columnHelper.accessor(row => row, {
            id: 'name',
            cell: info => <div><span className='whitespace-nowrap font-medium'>{info.getValue().id}</span><br /><span className=' font-medium text-gray-900'>{info.getValue().name}</span></div>,
            header: () => <span>Capability</span>,
          }),
        
        columnHelper.accessor('definition', {
            id: 'definition',
          header: () => <span className="">Definition: The capability to...</span>,
          cell: info => <span className="italic">{info.getValue()}</span>,
        }),

        // columnHelper.accessor(row => row.mappings.reduce((acc, cur) => `${acc} ${cur.id}`, ''), {
        //     id: 'external_ids',
        //     header: () => <span className="">External IDs</span>,
        //     cell: info => <span>{info.getValue()}</span>,
        // }),
       
        columnHelper.accessor('mappings', {
            id: 'mapped_ids',
            header: () => <span className="">Mapped IDs</span>,
            cell: info => info.getValue().length > 0 ? info.getValue().map(mapping => (
                    <div key={mapping.id} className="mb-4">{mapping.id}: {mapping.description}</div>
                )) : '—',
        }),

        columnHelper.accessor('mappings', {
            id: 'understanding',
            header: () => <span className="">Understanding</span>,
            cell: info => <span className="whitespace-nowrap font-medium text-gray-900">{info.getValue().length > 0 ? understandingText( Math.max(...info.getValue().map(mapping => mapping.understanding)) ) : '—'}</span>
        }),

        columnHelper.accessor('mappings', {
            id: 'information',
            header: () => <span className="">Information</span>,
            cell: info => <span className="whitespace-nowrap font-medium text-gray-900">{info.getValue().length > 0 ? informationText( Math.max(...info.getValue().map(mapping => mapping.information)) ) : '—'}</span>
        }),

        columnHelper.accessor('mappings', {
            id: 'opportunity',
            header: () => <span className="">Opportunity</span>,
            cell: info => <span className="whitespace-nowrap font-medium text-gray-900">{info.getValue().length > 0 ? opportunityText( Math.max(...info.getValue().map(mapping => mapping.opportunity)) ) : '—'}</span>
        }),
      ]

export default function Page() {
    const [data, setData] = React.useState(() => [...tableData])
    const rerender = React.useReducer(() => ({}), {})[1]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                <h1 className="text-lg font-semibold leading-6 text-gray-900">Capability Mappings</h1>
                <p className="mt-2 text-sm text-gray-700">
                    Here you can choose a regulatory framework or security standard and see how it maps to the PSCF.
                </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add user
                </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} scope="col" className={classNames(
                            header.column.columnDef.id === 'definition' ? 'hidden xl:table-cell' : '',
                            header.column.columnDef.id === 'area' ? 'hidden lg:table-cell' : '',
                            'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        )}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className={classNames(
                            cell.column.columnDef.id === 'definition' ? 'hidden xl:table-cell' : '',
                            cell.column.columnDef.id === 'area' ? 'hidden lg:table-cell' : '',
                            'px-3 py-4 text-sm text-gray-500 align-top'
                        )}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
    )
  };