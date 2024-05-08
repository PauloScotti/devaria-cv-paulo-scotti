import React from "react";
import { Container } from "react-bootstrap";
import SectionHeader from "../../shared/sectionHeader/sectionHeader";

const AboutUs: React.FC = () => {
	const ano = new Date().getFullYear();
	const dataAniversario = ano - 1983;

	return (
		<>
			<section className="section">
				<Container>
					<SectionHeader>
						<>Sobre mim</>
					</SectionHeader>
					<div className="clearfix" data-aos="fade-up" data-aos-duration="400" data-aos-delay="400" data-aos-easing="ease-out-cubic">
						<p>Desenvolvedor full-stcak formado em Análise e Desenvolvimento de Sistemas (FMU), com especialização pela Devaria.
							Possuo aptidões técnicas em diversas linguagens e frameworks, como Javascript, Typescript, CSS, HTML, NodeJS (NestJS, NextJS), ReactJS (NextJS), Angular CLI, VueJS, C# (Entity Framework) e Python (FastAPI).</p>

						<p>Domínio das ferramentas Git, Github, PyCharm, Postman, Visual Studio Code e Visual Studio.</p>

						<p>Excelentes habilidades interpessoais com boa comunicação oral e escrita, apresentação em público, trabalho em equipe, organização e senso de dono.</p>

						<p>Busca constante de aprimoramento pessoal e profissional, bem como entrega de serviços com excelência e qualidade.
						</p>
					</div>
					<div className="short-info" data-aos="fade-up" data-aos-duration="600" data-aos-delay="400" data-aos-easing="ease-out-cubic">
						<ul className="list-unstyled">
							<li>
								<span className="first">Nome:</span>
								<span className="second">Paulo Roberto Scotti</span>
							</li>
							<li>
								<span className="first">Idade:</span>
								<span className="second">{dataAniversario}</span>
							</li>
							<li>
								<span className="first">Nascimento:</span>
								<span className="second">15/04/1983</span>
							</li>
							<li>
								<span className="first">Cidade:</span>
								<span className="second">São Paulo</span>
							</li>
							<li>
								<span className="first">Formação:</span>
								<span className="second">Superior Completo</span>
							</li>
							<li>
								<span className="first">E-mail:</span>
								<span className="second"><a href="mailto:paulo.scotti@hotmail.com">paulo.scotti@hotmail.com</a></span>
							</li>
							<li>
								<span className="first">Telefone:</span>
								<span className="second">+55 (11) 97556-0310</span>
							</li>
						</ul>
					</div>
				</Container>
			</section>
		</>
	)
}

AboutUs.displayName = "About US";
export default AboutUs;