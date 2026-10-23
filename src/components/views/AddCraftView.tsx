import React, { useState, useRef } from 'react';
import {
  Mic,
  MicOff,
  Camera,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Volume2,
  Minus,
  Plus,
  ShieldCheck,
  Upload,
  ArrowRight,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CraftItem, Language } from '../../types/craft';
import { audioSystem } from '../../utils/audioAssistant';
import { VERNACULAR_TRANSLATIONS } from '../../data/mockCrafts';

interface AddCraftViewProps {
  currentLang: Language;
  onCraftAdded: (newCraft: CraftItem) => void;
  onNavigateToBazaar: () => void;
}

export const AddCraftView: React.FC<AddCraftViewProps> = ({
  currentLang,
  onCraftAdded,
  onNavigateToBazaar
}) => {
  const [currentStep, setCurrentStep] = useState<number>(2); // Default active on Step 2 as specified
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>(
    'ನಾನು ಕೈಯಿಂದ ಕಸೂತಿ ಮಾಡಿದ ಶುದ್ಧ ಖಾದಿ ಬ್ಯಾಗ್, ಗೋಪುರ ಮತ್ತು ನವಿಲು ಮೋಟಿಫ್, 18 ಗಂಟೆಗಳ ಕಾಲ ಹೊಲಿದಿದ್ದೇನೆ...'
  );
  const [englishTranslation, setEnglishTranslation] = useState<string>(
    'Hand-stitched pure Khadi bag with temple Gopura and peacock motifs, crafted over 18 hours...'
  );

  // Photos
  const [frontImage, setFrontImage] = useState<string>(
    'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=700&q=80'
  );
  const [backImage, setBackImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80'
  );

  // Price Dial state (in ₹50 increments)
  const [finalPrice, setFinalPrice] = useState<number>(1650);
  const [published, setPublished] = useState<boolean>(false);

  // Suggested values
  const recommendedLabor = 1200;
  const rawMaterial = 350;
  const buffer = 100;
  const deliverySubsidy = 100;
  const guaranteedInHand = Math.max(0, finalPrice - deliverySubsidy);

  const t = VERNACULAR_TRANSLATIONS[currentLang];

  // Simulated vernacular voice recording with Web Speech / timed dictation
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      audioSystem.stop();
    } else {
      setIsRecording(true);
      // Play a short chime tone
      audioSystem.speakText('ಹೇಳಿ, ನಾವು ಆಲಿಸುತ್ತಿದ್ದೇವೆ...', 'kn');

      // Check if browser SpeechRecognition is available
      const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition
        || (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'kn-IN';
          recognition.continuous = false;
          recognition.interimResults = true;

          recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const text = event.results[current][0].transcript;
            if (text) {
              setTranscript(text);
            }
          };

          recognition.onend = () => {
            setIsRecording(false);
          };

          recognition.start();
          return;
        } catch (e) {
          console.warn('SpeechRecognition error, falling back to simulated dictation:', e);
        }
      }

      // High-fidelity fallback simulated vernacular recognition
      setTimeout(() => {
        setTranscript('ನಾನು ಕೈಯಿಂದ ಕಸೂತಿ ಮಾಡಿದ ಶುದ್ಧ ಖಾದಿ ಬ್ಯಾಗ್, ಗೋಪುರ ಮತ್ತು ನವಿಲು ಮೋಟಿಫ್, 18 ಗಂಟೆಗಳ ಕಾಲ ಹೊಲಿದಿದ್ದೇನೆ...');
        setEnglishTranslation('Hand-stitched pure Khadi bag with temple Gopura and peacock motifs, crafted over 18 hours...');
        setIsRecording(false);
      }, 3500);
    }
  };

  const handleAdjustPrice = (delta: number) => {
    setFinalPrice(prev => Math.max(500, prev + delta));
  };

  const handlePlayCraftSummary = () => {
    audioSystem.speakText(
      'ಕಸೂತಿ ಕಸೂತಿ ಕಲೆ. ಸಾವಯವ ಇಂಡಿಗೋ ಖಾದಿ ಹತ್ತಿ. 3 ದಿನಗಳು, 18 ಗಂಟೆಗಳ ಕೈಕೆಲಸ. ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಲೆ ₹1,650.',
      'kn'
    );
  };

  const handlePublish = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#943512', '#465f88', '#804500', '#ffdcc2']
    });

    const newCraft: CraftItem = {
      id: `craft-${Date.now()}`,
      title: 'Hand-embroidered Pure Khadi Motif Tote',
      kannadaTitle: 'ಕೈಕಸೂತಿ ಶುದ್ಧ ಖಾದಿ ಬ್ಯಾಗ್ (ಹೊಸತು)',
      category: 'Kasuti',
      artisanName: 'Parvathamma Hadapad',
      artisanCluster: 'Dharwad • Hubballi Cluster',
      artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      giTagNumber: 'GI #143 (Govt Certified)',
      price: finalPrice,
      originalPrice: finalPrice + 350,
      craftHours: 18,
      materialDetails: 'Organic Indigo Khadi Cotton (Dharwad Cluster), knotless embroidery',
      purityBadge: '100% Hand-Done • Knotless Reversible',
      image: frontImage,
      storySnippet: transcript,
      inStock: true,
      motifs: ['Gopura (Temple Tower)', 'Mayura (Peacock)'],
      stitches: ['Gavanti', 'Murgi'],
      blockchainStamp: `KAS-${Date.now().toString().slice(-6)}`
    };

    setPublished(true);
    onCraftAdded(newCraft);

    setTimeout(() => {
      onNavigateToBazaar();
    }, 2400);
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '1rem 1rem 7rem' }}>
      {/* 3-Step Tactile Progress Stepper */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '12%',
            right: '12%',
            height: '3px',
            backgroundColor: 'var(--color-surface-container-high)',
            zIndex: 1
          }}>
            <div style={{
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
              height: '100%',
              backgroundColor: 'var(--color-primary)',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Step 1 */}
          <div
            onClick={() => setCurrentStep(1)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, cursor: 'pointer' }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: currentStep >= 1 ? 'var(--color-primary)' : 'var(--color-surface-container)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              boxShadow: 'var(--shadow-sm)'
            }}>
              <CheckCircle2 size={20} />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '6px' }}>
              Step 1: ಭಾವಚಿತ್ರ
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)' }}>
              (Photo Proof ✓)
            </span>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setCurrentStep(2)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, cursor: 'pointer' }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: currentStep === 2 ? 'var(--color-primary)' : 'var(--color-surface-container)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              boxShadow: currentStep === 2 ? 'var(--shadow-terracotta)' : 'none',
              border: '3px solid var(--color-surface)'
            }}
            className={currentStep === 2 ? 'animate-voice-pulse' : ''}
            >
              <Mic size={22} />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '6px' }}>
              Step 2: ಮಾತನಾಡಿ ಪರಿಶೀಲಿಸಿ
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)' }}>
              (Speak & Verify [ACTIVE])
            </span>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setCurrentStep(3)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, cursor: 'pointer' }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: currentStep === 3 ? 'var(--color-primary)' : 'var(--color-surface-container-high)',
              color: currentStep === 3 ? '#ffffff' : 'var(--color-on-surface-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              3
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: currentStep === 3 ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', marginTop: '6px' }}>
              Step 3: ಬೆಲೆ ನಿಗದಿ
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)' }}>
              (Final Price & Publish)
            </span>
          </div>
        </div>
      </div>

      {/* Vernacular Voice Assistant Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #f6f3ed 0%, #ffebe5 100%)',
        border: '2px solid var(--color-primary-container)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        marginBottom: '2rem',
        textAlign: 'center',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge-gi">
            <Sparkles size={13} />
            Vernacular Voice Assistant • ಧ್ವನಿ ಸಹಾಯಕ
          </span>
        </div>

        <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
          “बोलकर या अपनी भाषा में बताएं / ನಾನು ಕೈಯಿಂದ ಕಸೂತಿ ಮಾಡಿದ...”
        </h3>
        <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '640px', margin: '0 auto 1.25rem' }}>
          Press the microphone button below and describe your craft naturally in Kannada, Hindi, or Marathi. Our Vernacular AI identifies the motif, fabric, and handloom stitches automatically.
        </p>

        {/* Big Pulsing Mic Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <button
            onClick={toggleRecording}
            style={{
              width: '76px',
              height: '76px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isRecording ? '#ba1a1a' : 'var(--color-primary)',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(148, 53, 18, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            className={isRecording ? 'animate-voice-pulse' : ''}
            title={isRecording ? 'Stop recording' : 'Press to record voice in your language'}
          >
            {isRecording ? <MicOff size={36} /> : <Mic size={36} />}
          </button>
        </div>

        {/* Real-time vernacular speech transcript pill */}
        <div style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          border: '1.5px dashed var(--color-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem',
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {isRecording ? 'ಆಲಿಸಲಾಗುತ್ತಿದೆ... (Listening in Kannada)' : 'ಪರಿಶೀಲಿಸಿದ ಧ್ವನಿ ವಿವರಣೆ (Verified Transcript)'}
            </span>
            <button
              onClick={() => {
                setTranscript('');
                toggleRecording();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={12} />
              ಮರು ರೆಕಾರ್ಡ್ (Re-record)
            </button>
          </div>

          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.5 }}>
            "{transcript}"
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', marginTop: '0.25rem', fontStyle: 'italic' }}>
            Translation: "{englishTranslation}"
          </p>
        </div>
      </div>

      {/* Dual Photo Proof Slot (Front and Knotless Backside) */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h4 className="title-lg" style={{ color: 'var(--color-on-surface)' }}>
              Dual Photo Proof (ಮುಂಭಾಗ ಮತ್ತು ಹಿಂಭಾಗದ ಪುರಾವೆ)
            </h4>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
              Front side confirms motif balance; reverse side confirms clean knotless stitching.
            </p>
          </div>
          <span className="badge-gi">GI Purity Standard</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {/* Front Slot */}
          <div style={{
            border: '2px dashed var(--color-outline-variant)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-surface-container-low)',
            position: 'relative'
          }}>
            <img
              src={frontImage}
              alt="Front view"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: 'rgba(28, 28, 24, 0.85)',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              ಮುಂಭಾಗ (Front View ✓)
            </div>
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.68rem',
              fontWeight: 700
            }}>
              Handmade Stamp
            </div>
          </div>

          {/* Backside Slot */}
          <div style={{
            border: '2px dashed var(--color-outline-variant)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-surface-container-low)',
            position: 'relative'
          }}>
            {backImage ? (
              <>
                <img
                  src={backImage}
                  alt="Back view"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(28, 28, 24, 0.85)',
                  color: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  ಹಿಂಭಾಗ (Knotless Back View ✓)
                </div>
              </>
            ) : (
              <div style={{
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-outline)'
              }}>
                <Camera size={32} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '8px' }}>
                  ಹಿಂಭಾಗ ಸೇರಿಸಿ (Capture Backside)
                </span>
                <span style={{ fontSize: '0.7rem' }}>Verify reverse knotless finish</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auto-Detected AI Craft Lineage Card */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-low)',
        border: '1.5px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <span className="badge-labor" style={{ marginBottom: '0.35rem' }}>
              <FileCheck size={12} />
              Auto-Detected Lineage • ಸ್ವಯಂ ಗುರುತಿಸಿದ ವಿವರ
            </span>
            <h4 className="title-lg" style={{ color: 'var(--color-primary)' }}>
              Kasuti Needlework Provenance
            </h4>
          </div>

          <button
            onClick={handlePlayCraftSummary}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            <Volume2 size={16} color="var(--color-primary)" />
            <span>ಈ ವಿವರಗಳನ್ನು ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ (0:38s)</span>
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', padding: '0.85rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>Craft Technique</div>
            <div style={{ fontWeight: 700, color: 'var(--color-on-surface)', marginTop: '2px' }}>Kasuti Needle Embroidery</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-primary)' }}>GI #143 Certified Standard</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', padding: '0.85rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>Material Detected</div>
            <div style={{ fontWeight: 700, color: 'var(--color-on-surface)', marginTop: '2px' }}>Organic Indigo Khadi Cotton</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-tertiary)' }}>Dharwad Cluster Handspun</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', padding: '0.85rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>Calculated Labor</div>
            <div style={{ fontWeight: 700, color: 'var(--color-on-surface)', marginTop: '2px' }}>3 Days (18 Hours Hand Stitching)</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-secondary)' }}>100% Hand-Done Geometry</div>
          </div>
        </div>
      </div>

      {/* Suggested Fair Price Dial & Labor Calculator */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '2px solid var(--color-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h4 className="headline-md" style={{ color: 'var(--color-primary)' }}>
              Suggested Fair Price Dial & Labor Calculator
            </h4>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
              ಬೆಲೆ ನಿಗದಿ ಡಯಲ್: Labor ₹{recommendedLabor} (72%) + Material ₹{rawMaterial} (21%) + Buffer ₹{buffer} (7%)
            </p>
          </div>
          <span className="badge-gi">Suggested: ₹1,650</span>
        </div>

        {/* Interactive Stepper Control (- / + in ₹50 increments) */}
        <div style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
              Final Bazaar Selling Price (ಅಂತಿಮ ಮಾರಾಟ ಬೆಲೆ)
            </div>
            <div className="headline-xl" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
              ₹{finalPrice.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-tertiary)', fontWeight: 600 }}>
              Adjust in ₹50 increments
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => handleAdjustPrice(-50)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '2px solid var(--color-outline-variant)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Decrease price by ₹50"
            >
              <Minus size={22} color="var(--color-on-surface)" />
            </button>

            <span style={{ fontSize: '1.2rem', fontWeight: 700, minWidth: '80px', textAlign: 'center' }}>
              ₹{finalPrice}
            </span>

            <button
              onClick={() => handleAdjustPrice(50)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-terracotta)'
              }}
              title="Increase price by ₹50"
            >
              <Plus size={22} />
            </button>
          </div>
        </div>

        {/* Guaranteed Instant In-Hand Calculation */}
        <div style={{
          backgroundColor: 'var(--color-primary-fixed)',
          color: 'var(--color-on-primary-fixed)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
              Guaranteed Direct Bank Payout on Dispatch (ಖಾತೆಗೆ ಜಮೆಯಾಗುವ ನಿವ್ವಳ ಮೊತ್ತ)
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
              Computed automatically minus delivery subsidy (₹{deliverySubsidy})
            </div>
          </div>
          <div className="headline-md" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
            ₹{guaranteedInHand.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Artisan Lineage Verification Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--color-surface-container)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.75rem'
        }}>
          <ShieldCheck size={28} color="var(--color-primary)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
              Registered Artisan Lineage: Parvathamma Hadapad
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
              GI Cluster Reg #KA-DHW-4092 • Canara Bank UPI (••4920) Active
            </div>
          </div>
        </div>

        {/* Publish Action Button */}
        <button
          onClick={handlePublish}
          disabled={published}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.05rem',
            backgroundColor: published ? '#2e7d32' : 'var(--color-primary)'
          }}
        >
          <Sparkles size={20} />
          <span>{published ? 'ಪ್ರಕಟಿಸಲಾಗಿದೆ! Bazaar Updated' : 'ಪ್ರಕಟಿಸಿ • Publish to Bazaar (0% Platform Fee)'}</span>
        </button>
      </div>
    </div>
  );
};
