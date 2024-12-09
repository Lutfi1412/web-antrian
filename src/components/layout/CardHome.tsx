import React, { FC } from 'react';
import {ButtonHome} from '../common';

interface CardHomeProps {
    to: string; // rute tujuan, biasanya string
    children: React.ReactNode; // elemen anak di antara tag <ButtonHome>
    children2: string;
  }

  const CardHome: FC<CardHomeProps> = ({to, children, children2}) => {
    return (
    <div className="card border-0 shadow-sm">
        <div className="card-body p-5">
            <div className="feature-icon-1 bg-success bg-gradient mb-4">
                <i className="bi-people"></i>
            </div>
            <h3>{children2}</h3>
            <p className="mb-5">{children}</p>
            <ButtonHome to={to}>
                Tampilkan
            </ButtonHome>
        </div>
      </div>
    );
  };
  
  export default CardHome;